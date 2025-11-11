import { AdminLayout } from "@/components/AdminLayout";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import opinioIcon from "@/images/opinio-icon.png";

function Opinio() {
  const matches = Array(8).fill({ title: "DUR Vs HAM", status: "LIVE" });

  const records = [
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
  ];

  return (
    <AdminLayout title="Games > Opinio">
      <div className="p-6 space-y-8">
        <div className="flex justify-end items-center">
          <button className="text-[#119D82] text-sm font-semibold hover:underline">
            View All
          </button>
        </div>

        {/* Match Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {matches.map((match, i) => (
            <div
              key={i}
              className="relative bg-[#E8F7E8] rounded-[8px] shadow-md flex justify-between items-center px-4 py-3 border-l border-[#D1EAD1] h-[92px]"
            >
              <div className="absolute top-2 left-3 flex items-center gap-1">
                <span className="w-2 h-2 bg-[#E90000] rounded-full animate-pulse"></span>
                <span className="text-[#E90000] text-xs font-semibold">LIVE</span>
              </div>

              <div className="flex-1 text-center">
                <h3 className="font-semibold text-[#1D1D1D] text-sm">
                  {match.title}
                </h3>
              </div>

              <div className="flex justify-end items-center">
                <img
                  src={opinioIcon} 
                  alt="team"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* User Spin Record */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-[#1D1D1D]">
              User Spin Record
            </h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-[#E8E8C6] text-[#1D1D1D] hover:bg-[#119D82] text-sm flex items-center gap-2 border-none shadow-sm"
              >
                Filter by Wheel <ChevronDown className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-[#E8E8C6] text-[#1D1D1D] hover:bg-[#119D82] text-sm flex items-center gap-2 border-none shadow-sm"
              >
                Date Range <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#E8F7E8] text-[#1D1D1D]">
                <tr className="bg-[#E8E8C6] text-gray-700 text-left">
                  <th className="px-4 py-3 font-semibold">User ID</th>
                  <th className="px-4 py-3 font-semibold">User Name</th>
                  <th className="px-4 py-3 font-semibold">Match</th>
                  <th className="px-4 py-3 font-semibold">Poll Question</th>
                  <th className="px-4 py-3 font-semibold">Selected Option</th>
                  <th className="px-4 py-3 font-semibold">Result</th>
                  <th className="px-4 py-3 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-[#F9F9F9] text-[#1D1D1D]"
                  >
                    <td className="px-4 py-3">{r.id}</td>
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3">{r.match}</td>
                    <td className="px-4 py-3">{r.question}</td>
                    <td className="px-4 py-3">{r.option}</td>
                    <td className="px-4 py-3">{r.result}</td>
                    <td className="px-4 py-3">{r.time}</td>
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

export default Opinio;
