import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f4f8] p-4">
      <h1 className="text-6xl font-bold text-[#ff4c60] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#03045E] text-white font-semibold rounded-md hover:bg-[#023e8a] transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
