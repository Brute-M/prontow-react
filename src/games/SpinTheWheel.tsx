import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Search } from "lucide-react"; // 👈 Replaced MoreVertical with Trash2
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SpinTheWheel() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const wheelData = [
    {
      id: "PTW01",
      name: "Diwali Bonazoria Wheel",
      totalSegments: 8,
      status: "Active",
      createdDate: "20-Oct-25",
    },
    {
      id: "PTW02",
      name: "Diwali Bonazoria Wheel",
      totalSegments: 8,
      status: "Active",
      createdDate: "20-Oct-25",
    },
  ];

  const spinRecords = [
    {
      userId: "U-1001",
      userName: "Raj Sharma",
      wheelName: "Diwali Wheel",
      segment: "100% Cash Winnings",
      rewardType: "Cash",
      rewardValue: "₹100",
      spinDate: "21-Oct-25",
      status: "Claimed",
    },
    {
      userId: "U-1002",
      userName: "Priya Mehta",
      wheelName: "Diwali Wheel",
      segment: "50% Off Coupon",
      rewardType: "Coupon",
      rewardValue: "₹50",
      spinDate: "22-Oct-25",
      status: "Pending",
    },
    {
      userId: "U-1001",
      userName: "Raj Sharma",
      wheelName: "Diwali Wheel",
      segment: "100% Cash Winnings",
      rewardType: "Cash",
      rewardValue: "₹100",
      spinDate: "21-Oct-25",
      status: "Claimed",
    },
    {
      userId: "U-1002",
      userName: "Priya Mehta",
      wheelName: "Diwali Wheel",
      segment: "50% Off Coupon",
      rewardType: "Coupon",
      rewardValue: "₹50",
      spinDate: "22-Oct-25",
      status: "Pending",
    },
    {
      userId: "U-1001",
      userName: "Raj Sharma",
      wheelName: "Diwali Wheel",
      segment: "100% Cash Winnings",
      rewardType: "Cash",
      rewardValue: "₹100",
      spinDate: "21-Oct-25",
      status: "Claimed",
    },
    {
      userId: "U-1002",
      userName: "Priya Mehta",
      wheelName: "Diwali Wheel",
      segment: "50% Off Coupon",
      rewardType: "Coupon",
      rewardValue: "₹50",
      spinDate: "22-Oct-25",
      status: "Pending",
    },
  ];

  return (
    <AdminLayout title="Games > Spin the wheel">
      <div className="p-6 space-y-8 bg-[#F9FAF8] min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* Create Button */}
          <Button className="bg-[#119D82] hover:bg-[#0E8B70] text-white rounded-full px-6 py-2 text-sm font-medium"
            onClick={() => navigate('/games/spin-the-wheel/create-new-wheel')}>
            Create New Wheel
          </Button>

          <div className="flex items-center gap-3">
            {/* Search Input with icon */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-[#707070] h-4 w-4" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-64 bg-[#E6EAC3] rounded-full border-none text-[#4A4A4A] placeholder:text-[#707070] focus-visible:ring-0"
              />
            </div>
            <div className="bg-[#DDF4ED] p-2 rounded-full cursor-pointer">
              <div className="h-3 w-3 bg-[#119D82] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Wheel Table */}
        <div className="rounded-lg shadow-sm overflow-hidden border border-[#E8E8E8]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E8E8C6] text-gray-700 text-left">
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Wheel ID
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Wheel Name
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Total Segments
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Created date
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wheelData.map((wheel) => (
                <TableRow
                  key={wheel.id}
                  className="bg-white hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-[#4A4A4A] font-medium">
                    {wheel.id}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A] font-medium">
                    {wheel.name}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A] font-medium">
                    {wheel.totalSegments}
                  </TableCell>
                  <TableCell className="text-[#119D82] font-semibold">
                    {wheel.status}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A] font-medium">
                    {wheel.createdDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <button className="text-[#119D82] hover:underline text-sm font-medium">
                        View
                      </button>
                      <button className="text-[#119D82] hover:underline text-sm font-medium">
                        Edit
                      </button>
                      {/* Trash Icon instead of MoreVertical */}
                      <Trash2 className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* User Spin Record */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-[#E8E8E8] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-semibold text-[#1C1C1C]">
              User Spin Record
            </h3>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full bg-[#E6EAC3] text-[#4A4A4A] border-none focus-visible:ring-0"
                  >
                    Filter by Wheel
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Wheels</DropdownMenuItem>
                  <DropdownMenuItem>Diwali Wheel</DropdownMenuItem>
                  <DropdownMenuItem>New Year Wheel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full bg-[#E6EAC3] text-[#4A4A4A] border-none focus-visible:ring-0"
                  >
                    Date Range
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-[#E6EAC3]">
                <TableHead className="text-[#4A4A4A] font-semibold">
                  User ID
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  User Name
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Wheel Name
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Segment Won
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Reward Type
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Reward Value
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Spin Date
                </TableHead>
                <TableHead className="text-[#4A4A4A] font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spinRecords.map((record, index) => (
                <TableRow
                  key={index}
                  className="bg-white hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-[#4A4A4A]">
                    {record.userId}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">
                    {record.userName}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">
                    {record.wheelName}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">
                    {record.segment}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">
                    {record.rewardType}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">
                    {record.rewardValue}
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">
                    {record.spinDate}
                  </TableCell>
                  <TableCell className="text-[#119D82] font-semibold">
                    {record.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default SpinTheWheel;
