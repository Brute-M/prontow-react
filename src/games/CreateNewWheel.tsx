import { AdminLayout } from "@/components/AdminLayout";
import { Trash2, ChevronDown } from "lucide-react";
import React, { useState } from "react";

function CreateNewWheel() {
  const [segments] = useState(Array(8).fill(null));

  return (
    <AdminLayout title="Games > Spin the wheel > Create New wheel">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Wheel Name */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-[#E9E6C3] border rounded-md px-4 py-2 mb-3 shadow-sm">
            <p className="text-[#0C4128] font-medium">Wheel Name</p>
          </div>

          {/* Total Segments */}
          <div className="bg-[#E9E6C3] border rounded-md px-4 py-2 mb-6 flex justify-between items-center shadow-sm">
            <p className="text-[#0C4128] font-medium">Total Segments</p>
            <ChevronDown className="text-[#0C4128]" />
          </div>

          {/* Segments Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              {segments.map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#F2F1EE] border rounded-md px-4 py-2 shadow-sm"
                >
                  <span className="text-gray-700 font-medium">
                    Segment {index + 1}
                  </span>

                  <div className="flex items-center gap-3">
                    <button className="text-[#1E64C8] text-sm font-medium">
                      Edit
                    </button>
                    <Trash2 className="text-gray-600 w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {segments.map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#F2F1EE] border rounded-md px-4 py-2 shadow-sm"
                >
                  <span className="text-gray-700 font-medium">
                    Segment Label
                  </span>

                  <div className="flex items-center gap-3">
                    <button className="text-[#1E64C8] text-sm font-medium">
                      Edit
                    </button>
                    <Trash2 className="text-gray-600 w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateNewWheel;
