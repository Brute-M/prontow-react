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
  { id: '#56237845', date: '11-Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237846', date: '12-Nov-24', amount: 'Rs. 530', paymentMethod: 'Online', settled: false },
  { id: '#56237847', date: '13-Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: true },
  { id: '#56237848', date: '14-Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: false },
  { id: '#56237849', date: '15-Nov-24', amount: 'Rs. 482', paymentMethod: 'UPI', settled: true },
  { id: '#56237850', date: '16-Nov-24', amount: 'Rs. 482', paymentMethod: 'COD', settled: false },
  { id: '#56237851', date: '17-Nov-24', amount: 'Rs. 482', paymentMethod: 'Online', settled: true },
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
      pickupTime: '03:51 AM',
      dropDate: '20-Nov-24',
      dropTime: '05:51 PM',
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

  // ✅ Filter logic for search
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Payments & Settlements">
      <div className="space-y-6 p-2 sm:p-4 md:p-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search By Transaction ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 bg-blue-50/50 border-0 rounded-full text-sm sm:text-base w-full"
            />
          </div>
          <div className="flex gap-2 justify-end sm:justify-start">
            <Button
              size="icon"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#119D82] hover:bg-[#109BC5]"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#119D82] hover:bg-[#109BC5]"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {['Transaction ID', 'Date', 'Amount', 'Payment Method', 'Amount Settled'].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(transaction)}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{transaction.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{transaction.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.paymentMethod}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No matching transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div
                  key={index}
                  onClick={() => handleRowClick(transaction)}
                  className="p-4 flex flex-col gap-2 hover:bg-gray-50 cursor-pointer transition"
                >
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{transaction.id}</span>
                    <span className={transaction.settled ? 'text-green-600' : 'text-red-600'}>
                      {transaction.settled ? 'Settled' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Date:</span>
                    <span>{transaction.date}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Amount:</span>
                    <span>{transaction.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Method:</span>
                    <span>{transaction.paymentMethod}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No matching transactions found.</div>
            )}
          </div>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl w-[95vw] p-4 sm:p-6 rounded-2xl">
            <DialogHeader>
              <div className="text-xs sm:text-sm text-[#119D82] font-medium mb-4">
                Payments & Settlement {'>'} {selectedOrder?.orderId}
              </div>
            </DialogHeader>

            {selectedOrder && (
              <div className="bg-blue-50/50 rounded-2xl p-4 sm:p-6">
                <h2 className="text-center text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900">
                  Order Details
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {Object.entries({
                    'Order ID:': selectedOrder.orderId,
                    'Delivery Partner ID:': selectedOrder.deliveryPartnerId,
                    'Order Date:': selectedOrder.orderDate,
                    'Order Time:': selectedOrder.orderTime,
                    'Pickup Date:': selectedOrder.pickupDate,
                    'Pickup Time:': selectedOrder.pickupTime,
                    'Drop Date:': selectedOrder.dropDate,
                    'Drop Time:': selectedOrder.dropTime,
                    'Payment Type:': selectedOrder.paymentType,
                    'Payment Mode:': selectedOrder.paymentMode,
                    'Total Amount:': selectedOrder.totalAmount,
                    'Product Amount:': selectedOrder.productAmount,
                    'Delivery Amount:': selectedOrder.deliveryAmount,
                    'Settled:': selectedOrder.settled ? 'Yes' : 'No',
                  }).map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-700 font-medium">{label}</span>
                      <span
                        className={`font-semibold ${
                          label === 'Settled:'
                            ? value === 'Yes'
                              ? 'text-green-600'
                              : 'text-red-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
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
