import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical } from "lucide-react";
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

const initialCustomers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  sno: `CGS${String(i + 1).padStart(3, "0")}`,
  name: "Aish Verma",
  phone: "+91 9876543210",
  scoreCode: "SC-102",
  status: i % 2 === 0 ? "Active" : "Blocked",
}));

export default function CustomerRelationship() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <AdminLayout title="Customer Relationship">
      <div className="p-4 sm:p-6 space-y-6">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full bg-[#E8E8C6] border-none focus-visible:ring-0 text-gray-700 placeholder:text-gray-600 w-full"
              />
            </div>
          </div>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="rounded-full bg-[#119D82] hover:bg-[#0e866f] text-white px-5 w-full sm:w-auto">
                + Add Customer
              </Button>
            </DrawerTrigger>

            <DrawerContent
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto transition-transform duration-300 ease-in-out"
              style={{
                transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <DrawerHeader>
                <DrawerTitle className="text-lg font-semibold mb-4">
                  Add Customer
                </DrawerTitle>
              </DrawerHeader>

              <div className="space-y-4">
                <div>
                  <Input placeholder="Name" className="mt-1" />
                </div>
                <div>
                  <Input placeholder="Mobile Number" className="mt-1" />
                </div>
                <div>
                  <Input placeholder="Email" className="mt-1" />
                </div>
                <div>
                  <Input placeholder="DD/MM/YY" className="mt-1" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input placeholder="Anniversary Date" className="mt-1" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DrawerFooter className="mt-6">
                <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                  Add
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
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
                <th className="px-4 sm:px-6 py-3 font-medium text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.id}
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

                  <td className="px-4 sm:px-6 py-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button
                        size="sm"
                        className="bg-red-600 text-white hover:bg-red-700 px-3 py-1 rounded-md"
                      >
                        Block
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-800 text-white hover:bg-gray-900 px-3 py-1 rounded-md"
                      >
                        Unblock
                      </Button>

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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
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
      </div>
    </AdminLayout>
  );
}
