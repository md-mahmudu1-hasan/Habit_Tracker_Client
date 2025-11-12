import React from "react";
import { Link } from "react-router";

const Habit = ({ habit }) => {
  const habitDisk = habit.Description.slice(0, 40) + "...";
  return (
    <div className="bg-white p-2 py-4 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img
        src={habit.Image}
        alt={habit.Title}
        className="w-full h-64 rounded-xl object-cover"
      />
      <div className="p-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {habit.Title}
        </h2>
        <p className="text-gray-600 mb-4">{habitDisk}</p>
      </div>

      <p className="p-2 text-white text-center bg-[#65CFE6] rounded-2xl"> Streak : {habit?.completedDates?.length || 0} days</p>

      <div>
        <p className="p-2 text-gray-600">Creator Name : {habit.Username}</p>
      </div>

      <Link to={`/habitDetails/${habit._id}`}>
        <button className="bg-[#03045E] text-white px-4 py-2 rounded-lg hover:bg-[#03045E]/80 transition-colors">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default Habit;
