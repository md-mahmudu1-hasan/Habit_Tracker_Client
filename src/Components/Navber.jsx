import React, { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-hot-toast";
import Loader from "../Pages/Loader/Loader";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, SignOut, loading } = useAuth();

  const handleLogout = () => {
    SignOut()
      .then(() => {
        toast.success(`Logout successfully`);
      })
      .catch(() => {});
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-lg rounded-lg bg-linear-to-r from-[#00B4D8]/70 via-[#48CAE4]/70 to-[#90E0EF]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center text-white">
          <div className="shrink-0 text-2xl font-bold">
            <NavLink className="flex items-center gap-2" to="/">
              <img className="w-10 h-10" src="/Assets/Habit.png" alt="Habit" />{" "}
              Habit Tracker
            </NavLink>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/browse-public"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Browse Public Habits
            </NavLink>
            <>
              <NavLink
                to="/add-habit"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold" : "hover:underline"
                }
              >
                Add Habit
              </NavLink>
              <NavLink
                to="/my-habits"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold" : "hover:underline"
                }
              >
                My Habits
              </NavLink>
            </>
          </div>
          <div className="hidden md:flex space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-md bg-[#03469d] hover:bg-[#0077B6]"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-[#02449a] hover:bg-[#0077B6]"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <div className="relative flex items-center gap-2">
                <div className="dropdown dropdown-end">
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
                        className="h-16 w-16 object-cover rounded-full border-2 border-[#65CFE6] shadow-sm mb-2"
                      />
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.displayName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.email.slice(0, 30)}
                      </p>
                    </li>

                    <li className="pt-3">
                      <button
                        className="bg-linear-to-r from-[#0077B6] to-[#00B4D8] flex justify-center rounded-lg text-white font-medium py-2 hover:opacity-90 active:scale-95 transition-all duration-300"
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
