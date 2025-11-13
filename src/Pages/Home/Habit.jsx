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

  const habitDisk = habit.Description.slice(0, 40) + "...";
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 p-4 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={habit.Image}
          alt={habit.Title}
          className="w-full h-60 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute flex items-center justify-between bottom-2 right-2 bg-[#65CFE6] text-white text-sm px-3 py-1 rounded-full shadow">
          <span className="h-10 w-10 flex items-center justify-center">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
              />
            )}{" "}
          </span>
          <span>{habit?.streak || 0} Days Streak</span>
        </div>
      </div>

      <div className="p-3">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{habit.Title}</h2>
        <p className="text-gray-600 text-sm mb-4">{habitDisk}</p>

        <div className="flex items-center mb-3">
          <p className="text-sm text-gray-700 font-medium">
            <span className="text-xs text-gray-500 italic">Habit Creator</span>:{" "}
            {habit?.Username || "Unknown"}
          </p>
        </div>

        <Link to={`/habitDetails/${habit._id}`}>
          <button className="w-full bg-[#03045E] text-white py-2 rounded-xl font-semibold hover:bg-[#03045E]/90 active:scale-95 transition-all duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Habit;
