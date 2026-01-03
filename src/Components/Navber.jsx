import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { user, SignOut } = useAuth();

  const handleLogout = () => {
    SignOut()
      .then(() => toast.success("Logout successfully"))
      .catch(() => {});
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "underline font-semibold dark:text-sky-400"
      : "hover:underline dark:hover:text-sky-300";

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50 shadow-lg rounded-lg
        bg-linear-to-r from-[#00B4D8]/70 via-[#48CAE4]/70 to-[#90E0EF]/70
        dark:bg-linear-to-r dark:from-[#0F172A] dark:via-[#020617] dark:to-[#020617]
        dark:shadow-black/40
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center text-white dark:text-gray-100">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <img className="w-10 h-10" src="/Assets/Habit.png" alt="Habit" />
            Habit Tracker
          </NavLink>
          <label className="flex items-center cursor-pointer space-x-2">
            <span className="text-sm font-medium dark:text-gray-200">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              defaultChecked={localStorage.getItem("theme") === "dark"}
              className="toggle"
            />
          </label>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/browse-public" className={navLinkClass}>
              Browse Public Habits
            </NavLink>
            <NavLink to="/add-habit" className={navLinkClass}>
              Add Habit
            </NavLink>
            <NavLink to="/my-habits" className={navLinkClass}>
              My Habits
            </NavLink>
          </div>

          {/* Auth Buttons / User */}
          <div className="hidden md:flex space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-md bg-[#03469d] hover:bg-[#0077B6] dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-[#02449a] hover:bg-[#0077B6] dark:bg-slate-700 dark:hover:bg-slate-600"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <img
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#65CFE6] dark:border-sky-400 hover:scale-105 transition"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>

                <ul className="dropdown-content menu w-72 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/95 text-gray-800 dark:text-gray-100 backdrop-blur-lg shadow-xl border border-gray-100 dark:border-slate-700">
                  <li className="flex flex-col items-center text-center border-b border-gray-200 dark:border-slate-700 pb-3">
                    <img
                      src={user?.photoURL}
                      className="w-16 h-16 rounded-full border-2 border-sky-400"
                      alt=""
                    />
                    <p className="font-semibold mt-2">{user?.displayName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </li>

                  <li className="pt-3">
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 rounded-lg text-white bg-linear-to-r from-[#0077B6] to-[#00B4D8] dark:from-sky-600 dark:to-cyan-600 hover:opacity-90 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 text-white">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block underline font-semibold"
                : "block hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/browse-public"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block underline font-semibold"
                : "block hover:underline"
            }
          >
            Browse Public Habits
          </NavLink>

          <>
            <NavLink
              to="/add-habit"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block underline font-semibold"
                  : "block hover:underline"
              }
            >
              Add Habit
            </NavLink>
            <NavLink
              to="/my-habits"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block underline font-semibold"
                  : "block hover:underline"
              }
            >
              My Habits
            </NavLink>
          </>

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 mr-2 my-2 rounded-md bg-[#03469d] hover:bg-[#0077B6]"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 my-2 rounded-md bg-[#02449a] hover:bg-[#0077B6]"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <div className="relative flex items-center gap-2">
              <div className="dropdown dropdown-start">
                <div
                  tabIndex={0}
                  role="button"
                  className="m-1 outline-none focus:ring-2 focus:ring-[#65CFE6] rounded-full transition-all duration-200"
                >
                  <img
                    className="w-11 h-11 object-cover rounded-full border-2 border-[#65CFE6] hover:scale-105 transition-transform duration-300 shadow-md"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>

                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-white/90 backdrop-blur-lg rounded-2xl z-1 w-72 p-4 shadow-xl border border-gray-100"
                >
                  <li className="flex flex-col items-center text-center py-2 border-b border-gray-200">
                    <img
                      src={user?.photoURL}
                      alt="User"
                      className="w-16 h-16 rounded-full border-2 border-[#65CFE6] shadow-sm mb-2"
                    />
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.displayName}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </li>

                  <li className="pt-3">
                    <button
                      className="w-full bg-linear-to-r from-[#0077B6] to-[#00B4D8] flex justify-center rounded-lg text-white font-medium py-2 hover:opacity-90 active:scale-95 transition-all duration-300"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
