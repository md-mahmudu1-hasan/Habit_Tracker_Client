import React, { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

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

          {loading ? (
            <span>loading...</span>
          ) : (
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
                <div className="flex items-center gap-2">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <img
                        className="w-10 h-10 object-cover rounded-full"
                        referrerPolicy="no-referrer"
                        src={user?.photoURL}
                        alt={user?.displayName}
                      />{" "}
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content bg-[#6BC5D0] menu rounded-box z-1 w-80 p-2 shadow-sm"
                    >
                      <li>
                        <p>{user?.displayName}</p>
                      </li>
                      <li>
                        <p>{user?.email}</p>
                      </li>
                      <li>
                        <button
                          className="bg-[#02449a] flex justify-center hover:bg-[#0077B6] rounded-md text-white px-4 py-2 my-2"
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
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-start">
                <div tabIndex={0} role="button" className="m-1">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={user?.photoURL}
                    alt=""
                  />{" "}
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content bg-[#6BC5D0] menu rounded-box z-1 w-80 p-2 shadow-sm"
                >
                  <li>
                    <p>{user?.displayName}</p>
                  </li>
                  <li>
                    <p>{user?.email}</p>
                  </li>
                  <li>
                    <button
                      className="bg-[#02449a] flex justify-center hover:bg-[#0077B6] rounded-md text-white px-4 py-2 my-2"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
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
