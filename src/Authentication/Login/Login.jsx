import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../../Pages/Loader/Loader";

// ---------- ICONS ----------
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AtSignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <circle cx="12" cy="16" r="1"></circle>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ---------- LOGIN COMPONENT ----------
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, googleSignIn, loading } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ---------------- HANDLERS ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    signIn(email, password)
      .then(() => {
        setSuccess(true);
        toast.success("Login successfully");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message.split("or")[1]);
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    setSuccess(false);

    googleSignIn()
      .then((res) => {
        setSuccess(true);
        toast.success(`${res.user.displayName} Login successfully`);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message.split("or")[1]);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fillDemoUser = () => {
    setEmail("mahmudul.dev@gmail.com");
    setPassword("Web12%%");
  };


  useEffect(() => {
    if (success) toast.success("Login successfully");
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) return <Loader />;

  // ---------------- RENDER ----------------
  return (
    <div className="bg-[#e0f6fa] dark:bg-gray-900 min-h-screen flex items-center justify-center py-10 px-4 mt-17">
      <div className="w-full max-w-md space-y-4 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#ADE8F4] dark:bg-slate-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ShieldIcon />
          </div>
          <h2 className="text-3xl font-bold text-[#03045E] dark:text-gray-100">Login</h2>
          <p className="text-[#03045E] dark:text-gray-300 mt-1">Access your secure account</p>
        </div>

        {/* GOOGLE SIGN IN */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-[#ADE8F4] dark:bg-sky-600 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-sky-500 transition-colors font-medium"
        >
          <GoogleIcon />
          <span className="ml-3">Continue with Google</span>
        </button>

        {/* DEMO CREDENTIAL BUTTONS */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={fillDemoUser}
            className="py-2 rounded-lg px-4 bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition"
          >
            Demo User
          </button>
        </div>

        {/* OR DIVIDER */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              Or sign in with email
            </span>
          </div>
        </div>

        {/* EMAIL / PASSWORD FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <AtSignIcon />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <LockIcon />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              state={{ email }}
              className="text-xs pl-1 text-right text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-sky-400"
              to="/forget-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-blue-700 dark:bg-sky-600 text-white font-semibold hover:bg-blue-600 dark:hover:bg-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-lg transform hover:scale-[1.01]"
          >
            Login to your account
          </button>
        </form>

        <p className="text-center text-gray-700 dark:text-gray-300 text-sm mt-2">
          New to our platform?{" "}
          <Link
            to="/signup"
            className="font-bold text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-sky-400 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
