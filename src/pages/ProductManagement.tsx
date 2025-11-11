import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  MoreVertical,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../adminApi/productApi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import {
  addCategory,
  addSubCategory,
  getAllCategories,
} from "@/adminApi/categoryApi";
import axios from "axios";

export default function ProductManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addSubCategoryDialogOpen, setAddSubCategoryDialogOpen] =
    useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    category: "",
    company: "",
    mrp: "",
    costPrice: "",
    stock: "",
    itemCode: "",
    gst: "",
    hsnCode: "",
    size: "",
    discount: "",
    packSize: "",
    description: "",
    image: "",
    productStatus: "active",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const productsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
      fetchCategories();
      setAuthLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      const productData = res?.data?.data?.rows || [];
      if (!Array.isArray(productData)) {
        throw new Error("Product data is not an array");
      }

      setProducts(productData);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      let categoryData = [];

      if (res?.data?.data?.rows && Array.isArray(res.data.data.rows)) {
        categoryData = res.data.data.rows;
      } else if (res?.data?.rows && Array.isArray(res.data.rows)) {
        categoryData = res.data.rows;
      } else if (Array.isArray(res?.data)) {
        categoryData = res.data;
      }
      setCategories(categoryData);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const validate = () => {
    const requiredFields = {
      productName: "Product Name",
      category: "Category",
      mrp: "MRP",
      costPrice: "Cost Price",
      stock: "Stock",
      gst: "GST",
    };
    const newErrors = {};

    Object.keys(requiredFields).forEach((field) => {
      const value = formData[field];
      
      // Check if field is empty or invalid
      if (!value || String(value).trim() === "") {
        newErrors[field] = `${requiredFields[field]} is required.`;
      }
      
      // Additional validation for numeric fields
      if (field === "mrp" || field === "costPrice") {
        if (Number(value) <= 0) {
          newErrors[field] = `${requiredFields[field]} must be greater than 0.`;
        }
      }
      
      if (field === "stock" || field === "gst") {
        if (Number(value) < 0) {
          newErrors[field] = `${requiredFields[field]} cannot be negative.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async () => {
  if (!validate()) {
    const requiredFields = {
      productName: "Product Name",
      category: "Category",
      mrp: "MRP",
      costPrice: "Cost Price",
      stock: "Stock",
      gst: "GST",
    };
    const missingFields = Object.keys(requiredFields)
      .filter((field) => !formData[field])
      .map((field) => requiredFields[field]);
    alert(
      `Please fill the following required fields: ${missingFields.join(", ")}`
    );
    return;
  }

  setLoading(true);

  try {
    // Convert image to base64 if it's a File object
    let imageData = formData.image || "";
    if (imageFile && imageFile instanceof File) {
      imageData = imagePreview; // Use the base64 preview
    }

    const payload = {
      brandName: formData.brandName || "",
      productName: formData.productName,
      category: formData.category,
      company: formData.company || "",
      mrp: parseFloat(formData.mrp),
      costPrice: parseFloat(formData.costPrice),
      stock: parseInt(formData.stock),
      itemCode: formData.itemCode || "",
      gst: parseFloat(formData.gst),
      hsnCode: formData.hsnCode || "",
      size: formData.size || "",
      discount: formData.discount || "",
      packSize: formData.packSize || "",
      description: formData.description || "",
      image: imageData,
      productStatus: formData.productStatus || "active",
    };

    let response;
    if (editingProduct) {
      response = await updateProduct({ id: editingProduct._id, data: payload });
    } else {
      response = await addProduct({ data: payload });
    }

    if (response.data?.status) {
      alert(
        response.data.message ||
          (editingProduct
            ? "✅ Product updated successfully!"
            : "✅ Product added successfully!")
      );
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      await fetchProducts();
    } else {
      alert(response.data?.message || "Failed to save product");
    }
  } catch (err) {
    console.error("❌ Submit Error:", err);
    alert(err.response?.data?.message || "Failed to save product");
  } finally {
    setLoading(false);
  }
};


  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }
    if (!newCategoryDescription.trim()) {
      alert("Please enter a category description.");
      return;
    }
    try {
      await addCategory({
        name: newCategoryName,
        description: newCategoryDescription,
        parent: null,
      });
      alert("✅ Category added successfully!");
      setAddCategoryDialogOpen(false);
      setNewCategoryName("");
      setNewCategoryDescription("");
      await fetchCategories();
    } catch (err) {
      console.error("Add category error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleAddSubCategory = async () => {
    if (!selectedParentCategory) {
      alert("Please select a parent category.");
      return;
    }
    if (!newSubCategoryName.trim()) {
      alert("Please enter a sub-category name.");
      return;
    }
    try {
      await addSubCategory({
        name: newSubCategoryName,
        description: "",
        parent: selectedParentCategory,
      });
      alert("✅ Sub-category added successfully!");
      setAddSubCategoryDialogOpen(false);
      setNewSubCategoryName("");
      setSelectedParentCategory("");
      await fetchCategories();
    } catch (err) {
      console.error("Add sub-category error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add sub-category");
    }
  };

  const resetForm = () => {
    setFormData({
      brandName: "",
      productName: "",
      category: "",
      company: "",
      mrp: "",
      costPrice: "",
      stock: "",
      itemCode: "",
      gst: "",
      hsnCode: "",
      size: "",
      discount: "",
      packSize: "",
      description: "",
      image: "",
      productStatus: "active",
    });
    setImagePreview(null);
    setImageFile(null);
    setErrors({});
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      brandName: product.brandName || "",
      productName: product.productName || "",
      category: product.category?._id || "",
      company: product.company || "",
      mrp: product.mrp || "",
      costPrice: product.costPrice || "",
      stock: product.stock || "",
      itemCode: product.itemCode || "",
      gst: product.gst || "",
      hsnCode: product.hsnCode || "",
      size: product.size || "",
      discount: product.discount || "",
      packSize: product.packSize || "",
      description: product.description || "",
      image: product.image || "",
      productStatus: product.productStatus || "active",
    });

    setImagePreview(product.image || null);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({ id });
        await fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete product");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleStatusToggle = async (product) => {
  try {
    const updatedStatus =
      product.productStatus === "active" ? "inactive" : "active";

    const payload = {
      brandName: product.brandName || "",
      productName: product.productName,
      category: product.category?._id || product.category,
      company: product.company || "",
      mrp: parseFloat(product.mrp),
      costPrice: parseFloat(product.costPrice),
      stock: parseInt(product.stock),
      itemCode: product.itemCode || "",
      gst: parseFloat(product.gst),
      hsnCode: product.hsnCode || "",
      size: product.size || "",
      discount: product.discount || "",
      packSize: product.packSize || "",
      description: product.description || "",
      image: product.image || "",
      productStatus: updatedStatus,
    };

    await updateProduct({ id: product._id, data: payload });
    await fetchProducts();
  } catch (err) {
    console.error("Status update error:", err);
    alert("Failed to update product status");
  }
};


  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const search = searchTerm?.toLowerCase()?.trim() || "";
        if (!search) return true;

        const fields = [
          product?.productName,
          product?.brandName,
          product?.itemCode,
          product?.category?.name,
          product?.company,
        ];

        return fields.some((field) =>
          String(field || "")
            .toLowerCase()
            .includes(search)
        );
      })
    : [];

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (authLoading) {
    return null;
  }

  return (
    <AdminLayout title="Product Management">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center flex-wrap">
          <div className="flex gap-3">
            <Button
              className="bg-[#119D82] hover:bg-[#0e866f] text-white"
              onClick={() => setAddCategoryDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </Button>

            <Button
              className="bg-[#119D82] hover:bg-[#0e866f] text-white"
              onClick={() => setAddSubCategoryDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Sub-Category
            </Button>

            <Button
              className="bg-[#119D82] hover:bg-[#0e866f] text-white w-full sm:w-auto"
              onClick={() => {
                setEditingProduct(null);
                resetForm();
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>

          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search product..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-[#E8E8C6]">
              <tr>
                {[
                  "Item Code",
                  "Brand Name",
                  "Category/Subcategory",
                  "Thumbnail",
                  "Name",
                  "Quantity",
                  "Price",
                  "Stock",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {product.itemCode || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.brandName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.category?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.productName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">{product.stock || 0}</td>
                    <td className="px-6 py-4 text-sm">₹{product.mrp || 0}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span
                        className={`${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0 ? "In-stock" : "Out of stock"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Switch
                        checked={product.productStatus === "active"}
                        onCheckedChange={() => handleStatusToggle(product)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-full"
            >
              ‹
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              )
              .map((page) => (
                <Button
                  key={page}
                  size="sm"
                  variant={page === currentPage ? "default" : "outline"}
                  className={`rounded-full ${
                    page === currentPage
                      ? "bg-[#119D82] text-white"
                      : "text-gray-700 hover:bg-[#119D82] hover:text-white"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-full"
            >
              ›
            </Button>
          </div>
        )}

        {/* Add/Edit Drawer */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                {/* Product Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">
                    Product Image
                  </label>

                  <div className="border-2 border-dashed border-[#119D82] rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Product Preview"
                          className="w-32 h-32 object-cover rounded-md mx-auto border border-gray-200"
                        />
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                          <span className="text-[#119D82] font-medium">
                            Click to upload image
                          </span>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF or WEBP (max 5MB)
                          </p>
                        </>
                      )}
                    </label>

                    <input
                      id="image-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    {imagePreview && (
                      <div className="mt-3 flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={removeImage}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Item Code", name: "itemCode", required: false },
                    { label: "Brand Name", name: "brandName", required: false },
                    {
                      label: "Product Name",
                      name: "productName",
                      required: true,
                    },
                    { label: "Category", name: "category", required: true },
                    { label: "Company", name: "company", required: false },
                    {
                      label: "MRP",
                      name: "mrp",
                      type: "number",
                      required: true,
                    },
                    {
                      label: "Cost Price",
                      name: "costPrice",
                      type: "number",
                      required: true,
                    },
                    {
                      label: "Stock",
                      name: "stock",
                      type: "number",
                      required: true,
                    },
                    {
                      label: "GST %",
                      name: "gst",
                      type: "number",
                      required: true,
                    },
                    { label: "HSN Code", name: "hsnCode", required: false },
                    { label: "Size", name: "size", required: false },
                    {
                      label: "Discount %",
                      name: "discount",
                      type: "number",
                      required: false,
                    },
                    { label: "Pack Size", name: "packSize", required: false },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-1">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      {field.name === "category" ? (
                        <Select
                          onValueChange={handleCategoryChange}
                          value={formData.category}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          name={field.name}
                          type={field.type || "text"}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      )}
                      {errors[field.name] && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="p-6 border-t flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0 bg-white">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#119D82] hover:bg-[#0e866f] text-white w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{editingProduct ? "Updating..." : "Adding..."}</span>
                    </div>
                  ) : (
                    editingProduct ? "Update Product" : "Add Product"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Dialog */}
        <Dialog
          open={addCategoryDialogOpen}
          onOpenChange={setAddCategoryDialogOpen}
        >
          <DialogContent className="sm:max-w-[430px]">
            <DialogHeader>
              <DialogTitle className="text-center">Add Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-1">
              <div className="grid gap-2">
                <label htmlFor="category-name" className="text-sm font-medium">
                  Category Name
                </label>
                <Input
                  id="category-name"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="category-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <Input
                  id="category-description"
                  placeholder="Enter category description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="flex justify-between gap-12 px-7 pb-6">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 rounded-full w-[137px]"
                onClick={() => setAddCategoryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#119D82] hover:bg-[#0e866f] text-white rounded-full w-[137px]"
                onClick={handleAddCategory}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Sub-Category Dialog */}
        <Dialog
          open={addSubCategoryDialogOpen}
          onOpenChange={setAddSubCategoryDialogOpen}
        >
          <DialogContent className="sm:max-w-[430px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Add Sub-Category
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-1">
              <div className="grid gap-2">
                <Select
                  onValueChange={setSelectedParentCategory}
                  value={selectedParentCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((cat) => !cat.parent)
                      .map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {capitalizeFirstLetter(cat.name)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Input
                  id="sub-category-name"
                  placeholder="Enter Sub-Category Name"
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="flex justify-between gap-12 px-7 pb-6">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 rounded-full w-[137px]"
                onClick={() => setAddSubCategoryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#119D82] hover:bg-[#0e866f] text-white rounded-full w-[137px]"
                onClick={handleAddSubCategory}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}