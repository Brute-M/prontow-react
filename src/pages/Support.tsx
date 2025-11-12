import { AdminLayout } from '@/components/AdminLayout';
import React, { useState } from 'react';
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
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'Low Priority', status: 'Resolved' },
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'High Priority', status: 'Resolved' },
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'Low Priority', status: 'Resolved' },
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Refund Issue', priorityLevel: 'Low Priority', status: 'Resolved' },
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'High Priority', status: 'Pending' },
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Refund Issue', priorityLevel: 'Low Priority', status: 'Pending' },
  { id: '#9865', customerName: 'Manish Kumar', submissionDate: '11-Nov-24', issueType: 'Delivery Delay', priorityLevel: 'High Priority', status: 'Pending' },
];

function Support() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics
  const totalComplaints = tickets.length;
  const resolvedComplaints = tickets.filter(t => t.status === 'Resolved').length;
  const pendingComplaints = tickets.filter(t => t.status === 'Pending').length;

  return (
    <AdminLayout title="Supports">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="flex gap-4">
          <div className="bg-[#1BA9D8] text-white rounded-2xl px-8 py-6 min-w-[200px]">
            <div className="text-4xl font-bold mb-1 text-center">{totalComplaints}</div>
            <div className="text-sm font-medium text-center">Total Complaints</div>
          </div>
          
          <div className="bg-[#4CAF50] text-white rounded-2xl px-8 py-6 min-w-[200px]">
            <div className="text-4xl font-bold mb-1 text-center">{resolvedComplaints}</div>
            <div className="text-sm font-medium text-center">Resolved Complaints</div>
          </div>
          
          <div className="bg-[#FFA726] text-white rounded-2xl px-8 py-6 min-w-[200px]">
            <div className="text-4xl font-bold mb-1 text-center">{pendingComplaints}</div>
            <div className="text-sm font-medium text-center">Pending Complaints</div>
          </div>

          {/* Search Bar Section */}
<div className="flex items-center gap-3 ml-auto">
  <Input
    type="text"
    placeholder="Search By Ticket ID"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="h-[60px] w-[275px] rounded-full text-base border border-gray-300 focus:ring-0 focus:outline-none bg-[#DBE9FF]"
  />

  <Button
    size="icon"
    className="h-[60px] w-[60px] rounded-full bg-[#1BA9D8] hover:bg-[#1693BB] flex items-center justify-center"
  >
    <Search className="w-6 h-6 text-white" />
  </Button>

  <Button
    size="icon"
    className="h-[60px] w-[60px] rounded-full bg-[#1BA9D8] hover:bg-[#1693BB] flex items-center justify-center"
  >
    <SlidersHorizontal className="w-6 h-6 text-white" />
  </Button>
</div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Ticket ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Submission Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Issue Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Priority Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/support/support-details`)}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {ticket.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {ticket.submissionDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {ticket.issueType}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-semibold ${
                          ticket.priorityLevel === 'High Priority'
                            ? 'text-red-600'
                            : 'text-orange-500'
                        }`}
                      >
                        {ticket.priorityLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-semibold ${
                          ticket.status === 'Resolved'
                            ? 'text-green-600'
                            : 'text-blue-500'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Support;