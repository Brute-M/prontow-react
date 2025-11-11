import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  code: `#${String(921 + i).padStart(4, "0")}`,
  brand: i % 2 === 0 ? "Classmate" : "GemG",
  category: i % 3 === 0 ? "Notebooks" : "Stones",
  name:
    i % 2 === 0
      ? "A4 Size plain notebook Spiral Notebook"
      : "Aquamarine Gem",
  quantity: 60 + i,
  price: `Rs. ${263 + i * 10}`,
  stock: i % 3 === 0 ? 10 : 20,
  status: i % 3 !== 0,
}));

export default function ProductManagement() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  return (
    <AdminLayout title="Inventory Tracking">
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                className="pl-10 pr-4 py-2 bg-muted border-0 rounded-full shadow-sm focus:ring-2 focus:ring-[#007E66]"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-border text-gray-700 sticky top-0 z-10">
                  <tr className="bg-[#FFFFFF] text-left text-sm font-medium">
                    <th className="px-6 py-4">Item Code</th>
                    <th className="px-6 py-4">Brand Name</th>
                    <th className="px-6 py-4">Category/Sub Category</th>
                    <th className="px-6 py-4">Thumbnail</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">{product.code}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          <img
                            src="src/images/notebook1.png"
                            alt="notebook"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.quantity}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td
                        className={`px-6 py-4 font-semibold ${
                          product.stock <= 10
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={product.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white shadow-md"
                          >
                            <DropdownMenuItem
                              onClick={() => handleEdit(product)}
                            >
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Detail</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t bg-gray-50">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, products.length)} of {products.length} entries
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="xl:w-[320px] w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-fit xl:sticky top-24 self-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Low Stock Alert
          </h3>

          <div className="bg-red-50 p-3 rounded-md border border-red-200">
            <p className="text-sm text-red-700 font-medium">
              Product C Low Stock –{" "}
              <span className="font-semibold">5 Units remaining</span>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-3">
            <select className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007E66]">
              <option>Update Stock</option>
              <option>Product A</option>
              <option>Product B</option>
              <option>Product C</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Auto Notification
            </h4>
            <div className="flex items-center gap-3">
              <Switch />
              <label className="text-sm text-gray-600">Email</label>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Switch />
              <label className="text-sm text-gray-600">Push</label>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs same as before (kept intact) */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" defaultValue={selectedProduct?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" defaultValue={selectedProduct?.brand} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={selectedProduct?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Notebooks">Notebooks</SelectItem>
                  <SelectItem value="Stones">Stones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  defaultValue={selectedProduct?.quantity}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" defaultValue={selectedProduct?.price} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for your products.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input id="category-name" placeholder="Enter category name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-desc">Description</Label>
              <Input id="category-desc" placeholder="Enter description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
