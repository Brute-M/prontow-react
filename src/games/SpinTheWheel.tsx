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
import { Trash2, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";import { motion } from "framer-motion";

function SpinTheWheel() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [wheelFilter, setWheelFilter] = useState("All Wheels");
  const [dateFilter, setDateFilter] = useState("All");

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
      name: "Big Discount Wheel",
      totalSegments: 10,
      status: "Inactive",
      createdDate: "15-Nov-25",
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
      wheelName: "New Year Wheel",
      segment: "50% Off Coupon",
      rewardType: "Coupon",
      rewardValue: "₹50",
      spinDate: "22-Oct-25",
      status: "Pending",
    },
    {
      userId: "U-1003",
      userName: "Riya Sharma",
      wheelName: "Diwali Wheel",
      segment: "100% Cash Winnings",
      rewardType: "Cash",
      rewardValue: "₹100",
      spinDate: "21-Nov-25",
      status: "Claimed",
    },
    {
      userId: "U-1004",
      userName: "Priya Mehta",
      wheelName: "New Year Wheel",
      segment: "50% Off Coupon",
      rewardType: "Coupon",
      rewardValue: "₹50",
      spinDate: "22-Nov-25",
      status: "Pending",
    },
  ];

  // Convert "21-Oct-25" -> Date object
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    return new Date(2000 + parseInt(year), months[month], parseInt(day));
  };

  // ⭐ UNIVERSAL SEARCH FOR WHEEL TABLE
  const filteredWheelData = wheelData.filter((wheel) => {
    const s = search.toLowerCase();
    return (
      wheel.id.toLowerCase().includes(s) ||
      wheel.name.toLowerCase().includes(s) ||
      wheel.totalSegments.toString().includes(s) ||
      wheel.status.toLowerCase().includes(s) ||
      wheel.createdDate.toLowerCase().includes(s)
    );
  });

  // ⭐ FILTER SPIN RECORDS (Search + Wheel + Date)
  const filteredSpinRecords = spinRecords.filter((record) => {
    const s = search.toLowerCase();

    const matchesSearch =
      record.userId.toLowerCase().includes(s) ||
      record.userName.toLowerCase().includes(s) ||
      record.wheelName.toLowerCase().includes(s) ||
      record.segment.toLowerCase().includes(s) ||
      record.rewardType.toLowerCase().includes(s) ||
      record.rewardValue.toLowerCase().includes(s) ||
      record.spinDate.toLowerCase().includes(s) ||
      record.status.toLowerCase().includes(s);

    const matchesWheel =
      wheelFilter === "All Wheels" ||
      record.wheelName === wheelFilter;

    // Date Filter Logic
    const today = new Date();
    const recordDate = parseDate(record.spinDate);

    let matchesDate = true;

    if (dateFilter === "Last 7 Days") {
      const last7 = new Date(today);
      last7.setDate(today.getDate() - 7);
      matchesDate = recordDate >= last7;
    }

    if (dateFilter === "Last 30 Days") {
      const last30 = new Date(today);
      last30.setDate(today.getDate() - 30);
      matchesDate = recordDate >= last30;
    }

    return matchesSearch && matchesWheel && matchesDate;
  });

  return (
    <AdminLayout title="Games > Spin the wheel">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 space-y-8 bg-[#F9FAF8] min-h-screen"
      >

        {/* Header */}
        <div className="flex flex-col sm:flex-row md:flex-nowrap items-start sm:items-center justify-between gap-4">

          <Button
            className="bg-[#119D82] hover:bg-[#0E8B70] text-white rounded-full px-6 py-2 text-sm font-medium w-full sm:w-auto"
            onClick={() => navigate("/games/spin-the-wheel/create-new-wheel")}
          >
            Create New Wheel
          </Button>

          {/* Search */}
          <div className="flex items-end justify-end gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-[#707070] h-4 w-4" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#E6EAC3] rounded-full border-none text-[#4A4A4A] placeholder:text-[#707070] focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Wheel Table */}
        <motion.div className="overflow-x-auto rounded-lg shadow-sm border border-[#E8E8E8]">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="bg-[#E8E8C6] text-gray-700 text-left">
                <TableHead>Wheel ID</TableHead>
                <TableHead>Wheel Name</TableHead>
                <TableHead>Total Segments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredWheelData.map((wheel) => (
                <TableRow key={wheel.id} className="bg-white hover:bg-gray-50">
                  <TableCell>{wheel.id}</TableCell>
                  <TableCell>{wheel.name}</TableCell>
                  <TableCell>{wheel.totalSegments}</TableCell>
                  <TableCell className="text-[#119D82] font-semibold">
                    {wheel.status}
                  </TableCell>
                  <TableCell>{wheel.createdDate}</TableCell>

                  <TableCell>
                    <div className="flex gap-4 whitespace-nowrap">
                      <button className="text-[#119D82] hover:underline text-sm font-medium">
                        View
                      </button>
                      <button className="text-[#119D82] hover:underline text-sm font-medium">
                        Edit
                      </button>
                      <Trash2 className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </motion.div>

        {/* Spin Records */}
        <motion.div className="bg-white rounded-lg shadow-sm p-5 border border-[#E8E8E8] space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <h3 className="text-[18px] font-semibold text-[#1C1C1C]">
              User Spin Record
            </h3>

            <div className="flex flex-wrap gap-3">

              {/* Wheel Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full bg-[#E6EAC3] text-[#4A4A4A]">
                    {wheelFilter}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setWheelFilter("All Wheels")}>
                    All Wheels
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setWheelFilter("Diwali Wheel")}>
                    Diwali Wheel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setWheelFilter("New Year Wheel")}>
                    New Year Wheel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Date Range Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full bg-[#E6EAC3] text-[#4A4A4A]">
                    {dateFilter === "All" ? "Date Range" : dateFilter}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDateFilter("All")}>
                    All Dates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("Last 7 Days")}>
                    Last 7 Days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("Last 30 Days")}>
                    Last 30 Days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="bg-[#E6EAC3]">
                  <TableHead>User ID</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>Wheel Name</TableHead>
                  <TableHead>Segment Won</TableHead>
                  <TableHead>Reward Type</TableHead>
                  <TableHead>Reward Value</TableHead>
                  <TableHead>Spin Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredSpinRecords.map((record, index) => (
                  <TableRow key={index} className="bg-white hover:bg-gray-50">
                    <TableCell>{record.userId}</TableCell>
                    <TableCell>{record.userName}</TableCell>
                    <TableCell>{record.wheelName}</TableCell>
                    <TableCell>{record.segment}</TableCell>
                    <TableCell>{record.rewardType}</TableCell>
                    <TableCell>{record.rewardValue}</TableCell>
                    <TableCell>{record.spinDate}</TableCell>
                    <TableCell className="text-[#119D82] font-semibold">
                      {record.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>
        </motion.div>

      </motion.div>
    </AdminLayout>
  );
}

export default SpinTheWheel;
