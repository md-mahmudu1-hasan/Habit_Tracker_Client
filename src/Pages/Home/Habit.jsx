import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Habit = ({ habit }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Fire Streak Orange.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const habitDisk =
    habit.Description.length > 50
      ? habit.Description.slice(0, 50) + "..."
      : habit.Description;

  return (
    <div
      className="
        bg-gradient-to-b from-white to-blue-50
        dark:from-slate-800 dark:to-slate-900
        p-3 rounded-xl shadow-md dark:shadow-black/40
        hover:shadow-lg transform hover:-translate-y-1
        transition-all duration-300
        border dark:border-gray-700
        w-64
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={habit.Image}
          alt={habit.Title}
          className="w-full h-36 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
        />

        {/* Streak Badge */}
        <div
          className="
            absolute flex items-center gap-1 bottom-2 right-2
            bg-[#65CFE6] dark:bg-sky-600
            text-white text-xs px-2 py-1
            rounded-full shadow
          "
        >
          <span className="h-5 w-5 flex items-center justify-center">
            {animationData && <Lottie animationData={animationData} loop autoplay />}
          </span>
          <span>{habit?.streak || 0} Days</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
          {habit.Title}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {habitDisk}
        </p>

        <p className="text-xs text-gray-700 dark:text-gray-300 italic mb-2">
          Creator: {habit?.Username || "Unknown"}
        </p>

        <Link to={`/habitDetails/${habit._id}`}>
          <button
            className="
              w-full py-1.5 rounded-lg font-semibold text-white
              bg-[#03045E] hover:bg-[#03045E]/90
              dark:bg-sky-600 dark:hover:bg-sky-500
              active:scale-95 transition-all duration-300
            "
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Habit;
