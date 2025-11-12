"use client";
import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Camera } from "lucide-react";
import profileImage from "@/images/general.png";

function GeneralSettings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      console.log("Selected image:", imageURL);
    }
  };

  return (
    <AdminLayout title="Settings > General Settings">
      <div className="max-w-2xl h-[50vh] border-2px">
        <div className="bg-white rounded-lg shadow-sm p-2">
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-2xl font-semibold">U</span>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Camera Button */}
              <label
                htmlFor="profileImageInput"
                className="absolute bottom-0 right-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                placeholder="Name"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                placeholder="Address"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                placeholder="Change Password"
              />
            </div>

            {/* Two Factor Authentication Toggle */}
            <div className="flex items-center justify-between pt-2">
              <label className="text-sm font-medium text-gray-700">
                Two Factor Authentication
              </label>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorAuth ? "bg-teal-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorAuth ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default GeneralSettings;
