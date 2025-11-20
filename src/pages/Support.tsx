import { AdminLayout } from '@/components/AdminLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Ticket {
  id: string;
  customerName: string;
  submissionDate: string;
  issueType: string;
  priorityLevel: 'High Priority' | 'Low Priority';
  status: 'Pending' | 'Resolved';
}

const tickets: Ticket[] = [
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'High Priority', status: 'Pending' },
  { id: '#2356', customerName: 'Harsh Singh', submissionDate: '11-Nov-24', issueType: 'Refund Issue', priorityLevel: 'High Priority', status: 'Pending' },
  { id: '#7462', customerName: 'Riya Sharma', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'Low Priority', status: 'Resolved' },
  { id: '#8421', customerName: 'Aman Verma', submissionDate: '11-Nov-24', issueType: 'Refund Issue', priorityLevel: 'Low Priority', status: 'Resolved' },
  { id: '#5639', customerName: 'Simran Kaur', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'High Priority', status: 'Pending' },
];

function Support() {
  const navigate = useNavigate();

  // ⭐ New states for controlled search
  const [searchTerm, setSearchTerm] = useState(''); // typing
  const [searchQuery, setSearchQuery] = useState(''); // actual filter (only on button click)

  const totalComplaints = tickets.length;
  const resolvedComplaints = tickets.filter((t) => t.status === 'Resolved').length;
  const pendingComplaints = tickets.filter((t) => t.status === 'Pending').length;

  // 🔍 Filter only when searchQuery updates (after clicking search icon)
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Supports">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="space-y-6"
      >
        {/* Stats + Search */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-stretch">
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 flex-1">
            <div className="bg-[#1BA9D8] text-white rounded-2xl px-6 py-5 flex-1 min-w-[160px]">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-center">{totalComplaints}</div>
              <div className="text-sm font-medium text-center">Total Complaints</div>
            </div>

            <div className="bg-[#4CAF50] text-white rounded-2xl px-6 py-5 flex-1 min-w-[160px]">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-center">{resolvedComplaints}</div>
              <div className="text-sm font-medium text-center">Resolved Complaints</div>
            </div>

            <div className="bg-[#FFA726] text-white rounded-2xl px-6 py-5 flex-1 min-w-[160px]">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-center">{pendingComplaints}</div>
              <div className="text-sm font-medium text-center">Pending Complaints</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-between sm:justify-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
            
            {/* Input (typing only updates searchTerm) */}
            <Input
              type="text"
              placeholder="Search by Ticket ID, Customer, or Issue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[45px] md:h-[50px] w-full sm:w-[275px] rounded-full text-base border border-gray-300 bg-[#DBE9FF]"
            />

            {/* Search button triggers actual search */}
            <Button
              size="icon"
              onClick={() => setSearchQuery(searchTerm)} // ⭐ Only filter when clicked
              className="h-[45px] md:h-[50px] w-[45px] md:w-[50px] rounded-full bg-[#1BA9D8] hover:bg-[#1693BB]"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </Button>

            <Button
              size="icon"
              className="h-[45px] md:h-[50px] w-[45px] md:w-[50px] rounded-full bg-[#1BA9D8] hover:bg-[#1693BB]"
            >
              <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">Ticket ID</th>
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">Customer Name</th>
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">Submission Date</th>
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">Issue Type</th>
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">Priority Level</th>
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, index) => (
                    <tr
                      key={index}
                      onClick={() => navigate(`/support/support-details`)}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-4 md:px-6 py-4 font-medium">{ticket.id}</td>
                      <td className="px-4 md:px-6 py-4">{ticket.customerName}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-600">{ticket.submissionDate}</td>
                      <td className="px-4 md:px-6 py-4 font-medium">{ticket.issueType}</td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`font-semibold ${
                            ticket.priorityLevel === 'High Priority' ? 'text-red-600' : 'text-orange-500'
                          }`}
                        >
                          {ticket.priorityLevel}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`font-semibold ${
                            ticket.status === 'Resolved' ? 'text-green-600' : 'text-blue-500'
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No matching tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

export default Support;
