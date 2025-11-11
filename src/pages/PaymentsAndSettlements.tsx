import { AdminLayout } from '@/components/AdminLayout';
import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  paymentMethod: string;
  settled: boolean;
  deliveryPartnerId?: string;
  orderTime?: string;
  pickupDate?: string;
  pickupTime?: string;
  dropDate?: string;
  dropTime?: string;
  paymentType?: string;
  paymentMode?: string;
  totalAmount?: string;
  productAmount?: string;
  deliveryAmount?: string;
}

interface OrderDetails {
  orderId: string;
  deliveryPartnerId: string;
  orderDate: string;
  orderTime: string;
  pickupDate: string;
  pickupTime: string;
  dropDate: string;
  dropTime: string;
  paymentType: string;
  paymentMode: string;
  totalAmount: string;
  productAmount: string;
  deliveryAmount: string;
  settled: boolean;
}

const transactions: Transaction[] = [
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: false },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: false },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237845', date: '11 - Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
];

function PaymentsAndSettlements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (transaction: Transaction) => {
    const orderDetails: OrderDetails = {
      orderId: transaction.id,
      deliveryPartnerId: '#JP2316',
      orderDate: transaction.date,
      orderTime: '02:56 PM',
      pickupDate: '13-Nov-24',
      pickupTime: '03: 51 AM',
      dropDate: '20-Nov-24',
      dropTime: '05: 51 PM',
      paymentType: 'COD',
      paymentMode: 'UPI',
      totalAmount: 'Rs.1256',
      productAmount: 'Rs.856',
      deliveryAmount: 'Rs.200',
      settled: transaction.settled,
    };
    setSelectedOrder(orderDetails);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout title="Payments & Settlements">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search By Transaction ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 bg-blue-50/50 border-0 rounded-full text-base"
            />
          </div>
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-[#119D82] hover:bg-[#0D7A65]"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-[#119D82] hover:bg-[#0D7A65]"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Payment Methods
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Amount Settled
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(transaction)}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-semibold ${
                          transaction.settled ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.settled ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="text-sm text-[#119D82] font-medium mb-4">
                Payments & Settlement {'>'} {selectedOrder?.orderId}
              </div>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="bg-blue-50/50 rounded-2xl p-8">
                <h2 className="text-center text-lg font-semibold mb-6 text-gray-900">
                  Order Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Order ID:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.orderId}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Delivery Partner ID :</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.deliveryPartnerId}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Order Date:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.orderDate}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Order Time:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.orderTime}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Pickup Date</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.pickupDate}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Order Time:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.pickupTime}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Drop Date</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.dropDate}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Drop Time:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.dropTime}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Payment type:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.paymentType}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Payment Mode:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.paymentMode}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Total  Amount:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.totalAmount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Product  Amount:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.productAmount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Delivery  Amount:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {selectedOrder.deliveryAmount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Settled</span>
                    <span className={`text-sm font-semibold ${
                      selectedOrder.settled ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedOrder.settled ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default PaymentsAndSettlements;