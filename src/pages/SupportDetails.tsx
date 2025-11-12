"use client";
import { AdminLayout } from "@/components/AdminLayout";
import React from "react";
import { useParams } from "react-router-dom";
import customer from "/src/images/support-detail.png";

export default function SupportDetails() {
  const { ticketId } = useParams();
  return (
    <AdminLayout title={`Supports > Manish Kumar`}>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          {/* Customer Card */}
          <div className="bg-[#CFDA9C] w-[311px] h-[158px] p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <img
              src={customer}
              alt="Customer"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">Manish Kumar</h2>
              <p className="text-gray-700 text-sm">+91 8765432109</p>
              <p className="text-gray-700 text-sm">amilverma@gmail.com</p>
            </div>
          </div>

          {/* Customer Issue */}
          <div>
            <p className="font-semibold text-gray-800 mb-1">
              Customer Issue:{" "}
              <span className="font-normal">Delay in delivery</span>
            </p>
            <div className="bg-[#EFFBFF] p-4 rounded-2xl text-gray-800 text-sm leading-relaxed shadow-sm">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </div>
          </div>

          {/* Order Details*/}
          <div className="bg-[#E2F3F5] p-6 rounded-2xl shadow-sm border border-gray-200 max-w-sm">
            <h3 className="font-semibold text-lg text-center mb-4">
              Order Details
            </h3>

            <div className="space-y-3 text-sm text-gray-800">
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span>#ORD_56237845</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Delivery Partner ID:</span>
                <span>#JP2316</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>11-Nov-24</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Time:</span>
                <span>02:56 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pickup Date:</span>
                <span>13-Nov-24</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pickup Time:</span>
                <span>03:51 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Drop Date:</span>
                <span>20-Nov-24</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Drop Time:</span>
                <span>05:51 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Type:</span>
                <span>COD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Mode:</span>
                <span>UPI</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>Rs.856</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Settled:</span>
                <span className="text-green-600 font-semibold">Yes</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CHAT SECTION */}
        <div className="bg-[#F5F8FA] rounded-2xl p-5 flex flex-col justify-between shadow-sm border border-gray-100 max-h-[50vh] overflow-hidden">
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {/* Incoming message */}
            <div className="flex gap-2 items-start">
              <img
                src={customer}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-white text-gray-800 text-sm p-3 rounded-xl shadow-sm max-w-[75%]">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </div>
            </div>

            {/* Outgoing message */}
            <div className="flex justify-end gap-2 items-start">
              <div className="bg-[#DDF3FF] text-gray-800 text-sm p-3 rounded-xl shadow-sm max-w-[75%]">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </div>
              <img
                src={customer}
                alt="admin"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {/* Another incoming message */}
            <div className="flex gap-2 items-start">
              <img
                src={customer}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-white text-gray-800 text-sm p-3 rounded-xl shadow-sm max-w-[75%]">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
