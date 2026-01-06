import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
    ${
      isActive
        ? "bg-white/90 text-[#0077B6] shadow dark:bg-slate-800 dark:text-sky-400"
        : "text-white hover:bg-white/20 dark:hover:bg-slate-800/70"
    }
  `;

  return (
    <div className="min-h-screen bg-[#e0f6fa] dark:bg-[#020617]">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-72
            bg-linear-to-b from-[#0096C7] via-[#00B4D8] to-[#48CAE4]
            dark:from-[#0F172A] dark:via-[#020617] dark:to-[#020617]
            text-white
            transform ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 transition-transform duration-300
          `}
        >
          {/* Brand */}
          <div className="px-6 py-5 border-b border-white/20">
            <h2 className="text-2xl font-bold tracking-wide">Habit Dashboard</h2>
            <p className="text-sm text-white/80 mt-1">
              Track • Improve • Repeat
            </p>
          </div>

          {/* Nav */}
          <nav className="p-5 space-y-2">
            <NavLink to="dashboard/my-profile" className={linkClass}>
              My Profile
            </NavLink>
            <NavLink to="dashboard/add-habit" className={linkClass}>
              Add Habit
            </NavLink>

            <NavLink to="dashboard/my-habits" className={linkClass}>
              My Habits
            </NavLink>

            <div className="pt-6 mt-6 border-t border-white/20">
              <NavLink
                to="/"
                className="block px-4 py-3 rounded-xl text-white hover:bg-red-500/80 transition"
              >
                ⬅ Back to Home
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Overlay (mobile) */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          />
        )}

        {/* Main */}
        <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
          {/* Top Bar */}
          <header
            className="
              h-16 flex items-center justify-between px-4 sm:px-6
              bg-white/80 dark:bg-slate-900/90
              backdrop-blur border-b border-gray-200 dark:border-slate-700
            "
          >
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-2xl text-[#03045E] dark:text-gray-100"
            >
              ☰
            </button>

            <h1 className="text-xl font-semibold text-[#03045E] dark:text-gray-100">
              Dashboard
            </h1>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
