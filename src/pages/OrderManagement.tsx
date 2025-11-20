import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { getOrders, updateOrderStatus } from "@/adminApi/orderApi";
import { toast } from "sonner";

// Animation variants for main page content
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation variants for dialog content
const dialogContentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
};


export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Status update form state
  const [statusForm, setStatusForm] = useState({
    status: "",
    trackingNumber: "",
    carrier: "",
    estimatedDelivery: ""
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        const orderData = res?.data?.data?.rows || res?.data?.data || res?.data || [];
        setOrders(Array.isArray(orderData) ? orderData : []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to fetch orders.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order: any) => {
        // Return all orders if search is empty
        if (!searchTerm || searchTerm.trim() === "") {
          return true;
        }

        const search = searchTerm.toLowerCase().trim();

        // Check each field for matches
        const orderId = (order?.orderId || order?._id || "").toLowerCase();
        const customerName = (order?.user?.name || "").toLowerCase();
        const customerEmail = (order?.user?.email || "").toLowerCase();
        const status = (order?.status || "").toLowerCase();
        const paymentMethod = (order?.paymentMethod || "").toLowerCase();

        // Return true if any field contains the search term
        return (
          orderId.includes(search) ||
          customerName.includes(search) ||
          customerEmail.includes(search) ||
          status.includes(search) ||
          paymentMethod.includes(search)
        );
      })
    : [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Processing: "bg-purple-100 text-purple-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !statusForm.status) {
      toast.error("Please select a status");
      return;
    }

    setUpdating(true);
    try {
      const payload: any = {
        status: statusForm.status,
      };

      if (statusForm.trackingNumber) {
        payload.trackingNumber = statusForm.trackingNumber;
      }
      if (statusForm.carrier) {
        payload.carrier = statusForm.carrier;
      }
      if (statusForm.estimatedDelivery) {
        payload.estimatedDelivery = new Date(statusForm.estimatedDelivery).toISOString();
      }

      await updateOrderStatus(selectedOrder._id, payload);
      
      // Update the order in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order: any) =>
          order._id === selectedOrder._id
            ? { ...order, ...payload }
            : order
        )
      );

      toast.success("Order status updated successfully!");
      setUpdateDialogOpen(false);
      
      // Reset form
      setStatusForm({
        status: "",
        trackingNumber: "",
        carrier: "",
        estimatedDelivery: ""
      });
    } catch (error: any) {
      console.error("Failed to update order status:", error);
      toast.error(error?.response?.data?.message || "Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const openUpdateDialog = (order: any) => {
    setSelectedOrder(order);
    setStatusForm({
      status: order.status || "",
      trackingNumber: order.trackingNumber || "",
      carrier: order.carrier || "",
      estimatedDelivery: order.estimatedDelivery 
        ? new Date(order.estimatedDelivery).toISOString().slice(0, 16)
        : ""
    });
    setUpdateDialogOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout title="Order Management">
        <div className="flex justify-center items-center h-64">Loading orders...</div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Order Management"> 
      <motion.div
        className="space-y-6 px-6 pb-8" // Added px-6 pb-8 for consistent padding with other pages
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Actions - Only Search Bar */}
        <motion.div // @ts-ignore
        variants={itemVariants}
        className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] max-w-md relative">
            {/* Changed icon size for consistency */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer name"
              className="pl-10 bg-muted border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div // @ts-ignore
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="bg-[#E8E8C6] text-gray-700 text-left">
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Order ID</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Customer</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Payment</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Total</th>
                  <th className="px-16 py-4 font-medium whitespace-nowrap">Actions</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Return Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order: any) => (
                    <tr key={order._id} className="text-sm hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">#{order.orderId || order._id.slice(-6)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.user?.name || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.paymentMethod || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap">Rs. {order.totalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedOrder(order);
                              setViewDialogOpen(true);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#119D82] hover:bg-[#0e866f] text-white"
                            onClick={() => openUpdateDialog(order)}
                          >
                            Update Status
                          </Button>
                        </div>
                      </td>
                      <td className="px-14 py-4 whitespace-nowrap">{order.returnRate || "0%"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? "No orders found matching your search" : "No orders found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (<motion.div // @ts-ignore
        variants={itemVariants}
        >
            <div className="flex items-center justify-between mt-4 flex-wrap"> {/* Adjusted styling for better spacing */}
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of{" "}
                {filteredOrders.length} entries
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
                {Array.from(
                  { length: Math.min(5, totalPages) },
                  (_, i) => i + 1
                ).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
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
          </motion.div>
        )}
      </motion.div>

      {/* View Order Dialog */}
      <AnimatePresence>
        {viewDialogOpen && (
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <motion.div
            // @ts-ignore
              variants={dialogContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-lg" // Apply className here as DialogContent is not a direct motion component
            >
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              #{selectedOrder?.orderId || selectedOrder?._id?.slice(-6)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedOrder?.user?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {selectedOrder?.createdAt 
                    ? new Date(selectedOrder.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment</p>
                <p className="font-medium">{selectedOrder?.paymentMethod || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium">Rs. {selectedOrder?.totalPrice || "N/A"}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(selectedOrder?.status || "")}>
                  {selectedOrder?.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return Rate</p>
                <p className="font-medium">{selectedOrder?.returnRate || "0%"}</p>
              </div>
            </div>
            {selectedOrder?.trackingNumber && (
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-medium">{selectedOrder.trackingNumber}</p>
              </div>
            )}
            {selectedOrder?.carrier && (
              <div>
                <p className="text-sm text-muted-foreground">Carrier</p>
                <p className="font-medium">{selectedOrder.carrier}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Update Status Dialog */}
      <AnimatePresence>
        {updateDialogOpen && (
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <motion.div
            // @ts-ignore
              variants={dialogContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-lg" // Apply className here
            >
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.orderId || selectedOrder?._id?.slice(-6)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={statusForm.status}
                onValueChange={(value) =>
                  setStatusForm({ ...statusForm, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                placeholder="TRACK123456789"
                value={statusForm.trackingNumber}
                onChange={(e) =>
                  setStatusForm({ ...statusForm, trackingNumber: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Input
                id="carrier"
                placeholder="FedEx, UPS, DHL, etc."
                value={statusForm.carrier}
                onChange={(e) =>
                  setStatusForm({ ...statusForm, carrier: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
              <Input
                id="estimatedDelivery"
                type="datetime-local"
                value={statusForm.estimatedDelivery}
                onChange={(e) =>
                  setStatusForm({ ...statusForm, estimatedDelivery: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpdateDialogOpen(false)}
              disabled={updating}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#119D82] hover:bg-[#0e866f]"
              onClick={handleUpdateStatus}
              disabled={updating || !statusForm.status}
            >
              {updating ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}