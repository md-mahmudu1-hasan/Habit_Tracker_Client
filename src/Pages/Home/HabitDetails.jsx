import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const HabitDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [habit, setHabit] = useState(null);

  const fetchHabit = async () => {
    try {
      const res = await axios.get(`/habits/${id}`);
      setHabit(res.data);
    } catch (err) {
      toast.error("Failed to fetch habit data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [id]);

  const handleMarkComplete = async () => {
    if (!habit) return;

    try {
      const res = await axios.patch(`/habits/${id}/complete`);
      setHabit(res.data);
      toast.success("Habit marked complete!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark complete");
    }
  };

  if (loading) return <Loader />;
  if (!habit)
    return <p className="text-center text-gray-500 mt-10">Habit not found</p>;

  return (
    <div className="bg-[#e0f6fa] min-h-screen py-10">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <img
          src={habit.Image}
          alt={habit.Title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{habit.Title}</h1>
        <p className="text-gray-700 mb-2">{habit.Description}</p>
        <p className="text-sm text-gray-500 mb-4">Category: {habit.Category}</p>

        <div className="mb-4">
          <p className="text-gray-600 mb-1">Progress: {habit.progress || 0}%</p>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${habit.progress || 0}%` }}
            />
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
            Streak: {habit.streak || 0} day{habit.streak !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <img
            src={habit?.UserImage}
            alt={habit?.Username}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-800 font-medium">{habit?.Username}</p>
            <p className="text-gray-500 text-sm">{habit?.UserEmail}</p>
          </div>
        </div>

        {habit.completedDates?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Completed Days:</h3>
            <div className="flex flex-wrap gap-2">
              {habit.completedDates.map((day, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleMarkComplete}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
};

export default HabitDetails;
