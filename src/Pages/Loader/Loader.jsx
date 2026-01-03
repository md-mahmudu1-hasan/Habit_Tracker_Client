import React, { useEffect, useState } from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="flex space-x-1">
        <div
          className="w-3 h-3 bg-[#03045E] dark:bg-white rounded-full animate-bounce"
          style={{ animationDelay: "-0.3s" }}
        ></div>
        <div
          className="w-3 h-3 bg-[#03045E] dark:bg-white rounded-full animate-bounce"
          style={{ animationDelay: "-0.15s" }}
        ></div>
        <div className="w-3 h-3 bg-[#03045E] dark:bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
