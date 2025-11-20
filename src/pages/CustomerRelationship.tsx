import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/AdminLayout"; 
import { getCustomers, deleteCustomer, updateCustomerStatus } from "@/adminApi/customerApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerRelationship() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await getCustomers();
        if (response.data && response.data.status) {
          const formattedCustomers = response.data.data.customers.map(
            (customer, index) => ({
              id: customer._id,
              sno: `CGS${String(index + 1).padStart(3, "0")}`,
              name:
                customer.firstName || customer.lastName
                  ? `${customer.firstName} ${customer.lastName}`.trim()
                  : "N/A",
              phone: customer.phoneNumber,
              email: customer.email || "N/A",
              dateOfBirth: customer.dateOfBirth || "N/A",
              maritalStatus: customer.maritalStatus || "N/A",
              anniversary: customer.anniversary || "N/A",
              gender: customer.gender || "N/A",
              scoreCode: "N/A",
              status: customer.isBlocked ? "Blocked" : "Active",
              rawData: customer,
            })
          );
          setCustomers(formattedCustomers);
        }
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = useCallback(async (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        setDeleting(true);
        await deleteCustomer(customerId);
        setCustomers(customers.filter((customer) => customer.id !== customerId));
        alert("Customer deleted successfully!");
      } catch (error) {
        console.error("Failed to delete customer:", error);
        alert("Failed to delete customer. Please try again.");
      } finally {
        setDeleting(false);
      }
    }
  }, [customers]);

  const handleUpdateStatus = useCallback(async (customerId: string, shouldBlock: boolean) => {
    const action = shouldBlock ? "block" : "unblock";
    if (window.confirm(`Are you sure you want to ${action} this customer?`)) {
      try {
        setUpdatingStatus(true);
        const response = await updateCustomerStatus(customerId, shouldBlock);

        if (response.data && response.data.status) {
          setCustomers((prevCustomers) =>
            prevCustomers.map((customer) =>
              customer.id === customerId
                ? { ...customer, status: shouldBlock ? "Blocked" : "Active" }
                : customer
            )
          );
          window.alert(`Customer ${action}ed successfully!`);
        } else {
          window.alert(`Failed to ${action} customer: ${response.data?.message || "Unknown error"}`);
        }
      } catch (error: any) {
        console.error(`Failed to ${action} customer:`, error);
        window.alert(`Failed to ${action} customer: ${error.message}`);
      } finally {
        setUpdatingStatus(false);
      }
    }
  }, []);

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase().trim();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower) ||
      customer.sno.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <AdminLayout title="Customer Relationship">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-6 space-y-6"
      >
        {/* Top Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <Button className="rounded-full bg-[#E8E8C6] text-gray-700 hover:bg-[#dddcae] text-sm sm:text-base">
              Filter by Rating ▼
            </Button>

            <Button className="rounded-full bg-[#E8E8C6] text-gray-700 hover:bg-[#dddcae] text-sm sm:text-base">
              Date Range ▼
            </Button>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 rounded-full bg-[#E8E8C6] border-none focus-visible:ring-0 text-gray-700 placeholder:text-gray-600 w-full"
              />
            </div>
          </div>

          {/* Add Customer Drawer */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="rounded-full bg-[#119D82] hover:bg-[#0e866f] text-white px-5 w-full sm:w-auto">
                + Add Customer
              </Button>
            </DrawerTrigger>

            <DrawerContent className="fixed top-0 left-0 h-screen/10 w-full max-w-md bg-white shadow-2xl">
              <div className="flex flex-col h-full">
                <DrawerHeader className="border-b px-6 py-5">
                  <DrawerTitle className="text-xl font-semibold text-gray-900">
                    Add Customer
                  </DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-5">
                    <Input 
                      placeholder="Name" 
                      className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600 placeholder:text-gray-400" 
                    />
                    <Input 
                      placeholder="Mobile Number" 
                      className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600 placeholder:text-gray-400" 
                    />
                    <Input 
                      placeholder="Email" 
                      className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600 placeholder:text-gray-400" 
                    />
                    <Input 
                      placeholder="DD/MM/YY" 
                      className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600 placeholder:text-gray-400" 
                    />
                    <Select>
                      <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600">
                        <SelectValue placeholder="Marital Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Anniversary" 
                      className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600 placeholder:text-gray-400" 
                    />
                    <Select>
                      <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200 rounded-lg text-gray-600">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full h-12 bg-green-700 hover:bg-green-800 text-white rounded-lg text-base font-medium">
                      Add
                    </Button>
                  </div>
                </div>

                <DrawerFooter className="px-6 py-6 space-y-3">
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-[#E8E8C6] text-gray-700 text-left">
                <th className="px-4 sm:px-6 py-3 font-medium">S.No</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Customer Name</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Phone Number</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Score Code</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                <th className="px-4 sm:px-6 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      Loading customers...
                    </td>
                  </tr>
                ) : currentCustomers.length > 0 ? (
                  currentCustomers.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-t hover:bg-gray-50 transition text-gray-800"
                    >
                      <td className="px-4 sm:px-6 py-3">{customer.sno}</td>
                      <td className="px-4 sm:px-6 py-3">{customer.name}</td>
                      <td className="px-4 sm:px-6 py-3">{customer.phone}</td>
                      <td className="px-4 sm:px-6 py-3">{customer.scoreCode}</td>
                      <td className="px-4 sm:px-6 py-3">
                        <span
                          className={`font-medium ${
                            customer.status === "Active"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-3 text-center">
                        <div className="flex justify-center gap-2 flex-wrap">
                          {customer.status === "Active" ? (
                            <Button
                              size="sm"
                              disabled={updatingStatus}
                              className="bg-red-600 text-white hover:bg-red-700 px-3 py-1 rounded-md"
                              onClick={() => handleUpdateStatus(customer.id, true)}
                            >
                              Block
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              disabled={updatingStatus}
                              className="bg-gray-800 text-white hover:bg-gray-900 px-3 py-1 rounded-md"
                              onClick={() => handleUpdateStatus(customer.id, false)}
                            >
                              Unblock
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                className="w-8 h-8 rounded-md border-gray-300"
                              >
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(customer)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteCustomer(customer.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full"
          >
            ‹
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1)
            )
            .map((page) => (
              <Button
                key={page}
                size="sm"
                variant={page === currentPage ? "default" : "outline"}
                className={`rounded-full ${
                  page === currentPage
                    ? "bg-[#119D82] text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full"
          >
            ›
          </Button>
        </div>

        {/* Customer Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Customer Details
              </DialogTitle>
            </DialogHeader>

            {selectedCustomer && (
              <div className="space-y-6 py-4">
                {/* Customer ID Badge */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Customer ID</p>
                    <p className="text-lg font-semibold text-[#119D82]">{selectedCustomer.sno}</p>
                  </div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        selectedCustomer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="text-base font-medium text-gray-900">{selectedCustomer.name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="text-base font-medium text-gray-900">{selectedCustomer.phone}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="text-base font-medium text-gray-900">{selectedCustomer.email}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Gender</p>
                      <p className="text-base font-medium text-gray-900 capitalize">{selectedCustomer.gender}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                      <p className="text-base font-medium text-gray-900">{selectedCustomer.dateOfBirth}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                      <p className="text-base font-medium text-gray-900 capitalize">{selectedCustomer.maritalStatus}</p>
                    </div>

                    {selectedCustomer.anniversary !== "N/A" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Anniversary</p>
                        <p className="text-base font-medium text-gray-900">{selectedCustomer.anniversary}</p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Score Code</p>
                      <p className="text-base font-medium text-gray-900">{selectedCustomer.scoreCode}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-[#119D82] hover:bg-[#0e866f] text-white"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      // Add edit functionality here
                    }}
                  >
                    Edit Customer
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
}