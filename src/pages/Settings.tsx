"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { ChevronRight } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const settingsOptions = [
    { id: 1, label: "General", path: "/settings/general" },
    { id: 2, label: "Forgot Password", path: "/settings/forgot-password" },
  ];

  return (
    <AdminLayout title="Settings">
      <div className="flex flex-col items-start w-full px-8 mt-6">
        <div className="w-[70%] max-w-2xl space-y-4">
          {settingsOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => navigate(option.path)}
              className="w-full bg-white border border-gray-300 rounded-md flex items-center justify-between px-5 py-4 shadow-sm hover:bg-gray-50 transition-all"
            >
              <span className="text-gray-800 font-medium text-base">
                {option.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
