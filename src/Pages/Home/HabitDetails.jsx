import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const HabitDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    axios.get(`/habits/${id}`).then((res) => {
      setHabit(res.data);
      setLoading(false);
    });
  }, [axios, id]);

  const calculateProgress = (completedDays = []) => {
    if (!completedDays.length) return 0;

    const now = new Date();
    const past30 = new Date();
    past30.setDate(now.getDate() - 30);

    const count = completedDays.filter(
      (day) => new Date(day) >= past30 && new Date(day) <= now
    ).length;

    return Math.min(100, Math.round((count / 30) * 100));
  };
  const calculateStreak = (completedDays = []) => {
    if (!completedDays.length) return 0;

    const sortedDays = [...completedDays].sort(
      (a, b) => new Date(b) - new Date(a)
    );

    let streak = 1;
    for (let i = 1; i < sortedDays.length; i++) {
      const prev = new Date(sortedDays[i - 1]);
      const curr = new Date(sortedDays[i]);
      const diff = (prev - curr) / (1000 * 60 * 60 * 24);

      if (diff === 1) streak++;
      else break;
    }
    return streak;
  };

  const handleMarkComplete = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      await axios.patch(`/habits/${id}/complete`);
      setHabit((prev) => {
        const updatedDays = [...(prev.completedDays || []), today];
        return {
          ...prev,
          completedDays: updatedDays,
          progress: calculateProgress(updatedDays),
          Streak: calculateStreak(updatedDays),
        };
      });

      toast.success("Habit marked as complete successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("You have already marked this habit complete today!");
      } else {
        toast.error("Failed to mark habit as complete!");
      }
    }
  };

  useEffect(() => {
    if (!habit) return;

    setHabit((prev) => ({
      ...prev,
      progress: calculateProgress(prev.completedDates),
      Streak: calculateStreak(prev.completedDates),
    }));
  }, [habit?.completedDates]);

  if (loading) return <p>Loading...</p>;

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
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
            Streak: {habit.Streak || 0} day
            {habit.Streak !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <img
            src={habit?.UserImage}
            alt={habit?.Username}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-800 font-medium">{habit?.Username}</p>
            <p className="text-gray-500 text-sm">{habit?.UserEmail}</p>
          </div>
        </div>

        {habit.completedDays && habit.completedDays.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Completed Days:</h3>
            <div className="flex flex-wrap gap-2">
              {habit.completedDays.map((day, i) => (
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
