import React, { useContext, useState } from "react";
import { AdminAuthContext } from "../../Context/AdminAuthContext";
import { Adminprotectedroute } from "../../components/index";
import defaultAvatar from "../../assets/admin.png"

function AdminProfile() {
  const { currentAdmin } = useContext(AdminAuthContext);

  return (
    <Adminprotectedroute>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-10 sm:items-center">
            {/* Profile Picture */}
            <img
              src={currentAdmin.avatar || defaultAvatar}
              alt="Admin Profile"
              className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-gray-200"
            />

            {/* Profile Information */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {currentAdmin.username || "Admin"}
              </h1>
              <p className="text-gray-600 text-lg">
                {currentAdmin.email || "No Email Provided"}
              </p>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="mt-10 flex justify-center sm:justify-start">
            <button
              className="bg-blue-500 text-white px-8 py-3 rounded-md shadow hover:bg-blue-600"
              onClick={() => alert("Edit Profile feature coming soon!")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </Adminprotectedroute>
  );
}

export default AdminProfile;
