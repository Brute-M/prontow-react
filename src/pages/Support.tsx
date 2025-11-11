import { AdminLayout } from '@/components/AdminLayout';
import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
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
            <div className="text-4xl font-bold mb-1">{totalComplaints}</div>
            <div className="text-sm font-medium">Total Complaints</div>
          </div>
          
          <div className="bg-[#4CAF50] text-white rounded-2xl px-8 py-6 min-w-[200px]">
            <div className="text-4xl font-bold mb-1">{resolvedComplaints}</div>
            <div className="text-sm font-medium">Resolved Complaints</div>
          </div>
          
          <div className="bg-[#FFA726] text-white rounded-2xl px-8 py-6 min-w-[200px]">
            <div className="text-4xl font-bold mb-1">{pendingComplaints}</div>
            <div className="text-sm font-medium">Pending Complaints</div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex gap-3 ml-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search By Ticket ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-full bg-blue-50/50 border-0 rounded-full text-base"
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