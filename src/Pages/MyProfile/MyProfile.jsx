import React from "react";
import useAuth from "../../Hooks/useAuth";
import { Mail, User, Camera } from "lucide-react";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#e0f6fa] dark:bg-[#020617] py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#03045E] dark:text-sky-400">
            My Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div
          className="
            bg-white dark:bg-slate-900
            border border-sky-100 dark:border-slate-800
            rounded-2xl shadow-lg
            p-8
          "
        >
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/2kR2zjB/default-avatar.png"
                }
                alt="Profile"
                className="
                  w-32 h-32 rounded-full
                  object-cover
                  border-4 border-[#00B4D8]
                  dark:border-sky-500
                "
              />
              <div
                className="
                  absolute bottom-1 right-1
                  bg-[#00B4D8] dark:bg-sky-500
                  p-2 rounded-full
                  text-white
                "
              >
                <Camera size={16} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-[#03045E] dark:text-gray-100">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>

          {/* Info Section */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div
              className="
                flex items-center gap-4 p-4 rounded-xl
                bg-[#e0f6fa] dark:bg-[#020617]
                border border-sky-100 dark:border-slate-800
              "
            >
              <User className="text-[#0077B6] dark:text-sky-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="font-medium text-[#03045E] dark:text-gray-100">
                  {user?.displayName || "Not set"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div
              className="
                flex items-center gap-4 p-4 rounded-xl
                bg-[#e0f6fa] dark:bg-[#020617]
                border border-sky-100 dark:border-slate-800
              "
            >
              <Mail className="text-[#0077B6] dark:text-sky-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="font-medium text-[#03045E] dark:text-gray-100">
                  {user?.email || "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
