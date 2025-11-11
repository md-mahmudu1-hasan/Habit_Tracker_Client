import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const HabitDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // % of last 30 days
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await axios.get(`/habits/${id}`);
        setHabit(res.data);
        if (res.data.completedDaysLast30) {
          const completedDays = res.data.completedDaysLast30.filter(d => d).length;
          setProgress(Math.round((completedDays / 30) * 100));
          let currentStreak = 0;
          for (let i = res.data.completedDaysLast30.length - 1; i >= 0; i--) {
            if (res.data.completedDaysLast30[i]) currentStreak++;
            else break;
          }
          setStreak(currentStreak);
        }

      } catch (err) {
        console.log("Error fetching habit:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [axios, id]);

  const handleMarkComplete = async () => {
    try {
      const res = await axios.post(`/habits/${id}/complete`);
      setHabit(res.data);
      if (res.data.completedDaysLast30) {
        const completedDays = res.data.completedDaysLast30.filter(d => d).length;
        setProgress(Math.round((completedDays / 30) * 100));

        let currentStreak = 0;
        for (let i = res.data.completedDaysLast30.length - 1; i >= 0; i--) {
          if (res.data.completedDaysLast30[i]) currentStreak++;
          else break;
        }
        setStreak(currentStreak);
      }
    } catch (err) {
      console.log("Error marking habit complete:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!habit) return <p className="text-center mt-10 text-red-500">Habit not found</p>;

  return (
    <div className="bg-[#e0f6fa]">
        
  
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-17">
      <img
        src={habit.Image}
        alt={habit.Title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{habit.Title}</h1>
      <p className="text-gray-700 mb-2">{habit.Description}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {habit.Category}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <p className="text-gray-600 mb-1">Progress: {progress}%</p>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Streak Badge */}
      <div className="mb-4">
        <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
          Streak: {streak} day{streak !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Creator Info */}
      {habit.isPublic && habit.Creator && (
        <div className="flex items-center mb-4">
          <img
            src={habit.Creator.image}
            alt={habit.Creator.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-800 font-medium">{habit.Creator.name}</p>
            <p className="text-gray-500 text-sm">{habit.Creator.gmail}</p>
          </div>
        </div>
      )}

      {/* Mark Complete Button */}
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
