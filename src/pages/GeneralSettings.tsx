"use client";
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import axios from "axios";

function GeneralSettings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateofBirth: "",
    profilePic: "",
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const API_URL = "http://13.61.23.154:5000/api/profile/admin";

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setFormData({
          firstName: profileData.firstName || "",
          lastName: profileData.lastName || "",
          email: profileData.email || "",
          phoneNumber: profileData.phoneNumber || "",
          dateofBirth: profileData.dateofBirth ? profileData.dateofBirth.split("T")[0] : "",
          profilePic: profileData.profilePic || "",
        });
        setProfileImagePreview(profileData.profilePic || "");
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading saved profile:", error);
      }
    }
  }, []);

  const getAuthToken = () => {
    // Try to get token from localStorage
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('authToken') || 
                  localStorage.getItem('accessToken');
    return token;
  };

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
      setProfileImagePreview(imageURL);
      // In a real implementation, you would upload the file to a server
      // and get back a URL to store in formData.profilePic
      console.log("Selected image:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = getAuthToken();
      
      if (!token) {
        alert("No authentication token found. Please login again.");
        return;
      }
      
      // Try PUT method first (most common for updates)
      const response = await axios.put(API_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.status) {
        // Update the profile image preview with the saved image
        if (response.data.data.profilePic) {
          setProfileImagePreview(response.data.data.profilePic);
        }
        
        // Update formData with the response data to reflect saved changes
        const updatedData = response.data.data;
        const newFormData = {
          firstName: updatedData.firstName || "",
          lastName: updatedData.lastName || "",
          email: updatedData.email || "",
          phoneNumber: updatedData.phoneNumber || "",
          dateofBirth: updatedData.dateofBirth ? updatedData.dateofBirth.split("T")[0] : "",
          profilePic: updatedData.profilePic || "",
        };
        
        setFormData(newFormData);
        
        // Save to localStorage so it persists across page navigation
        localStorage.setItem('adminProfile', JSON.stringify(updatedData));
        
        // Show success alert
        setShowAlert(true);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      
      // Show user-friendly error message
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      } else if (error.response) {
        alert(`Failed to update profile: ${error.response.data.message || 'Please try again.'}`);
      } else if (error.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    if (loading) {
    return (
      <AdminLayout title="Settings > General Settings">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
      <AdminLayout title="Settings > General Settings">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings > General Settings">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="p-4 sm:p-6"
      >
        {/* Success Alert */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-auto max-w-2xl mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between"
          >
            <span className="font-medium">Profile updated successfully!</span>
            <button
              onClick={() => setShowAlert(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm">
            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 text-2xl font-semibold">
                      {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : "U"}
                    </span>
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                  placeholder="First Name"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                  placeholder="Last Name"
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
                  type="date"
                  name="dateofBirth"
                  value={formData.dateofBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-black outline-none"
                  placeholder="Date of Birth"
                />
              </div>

              {/* Two Factor Authentication Toggle */}
              {/* <div className="flex items-center justify-between pt-2">
                <label className="text-sm font-medium text-gray-700">
                  Two Factor Authentication
                </label>
                <button
                  type="button"
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
              </div> */}

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </AdminLayout>
  );
}

export default GeneralSettings;