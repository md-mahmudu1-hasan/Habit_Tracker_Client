import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { fadeIn } from "../../Utilities/Varients";
import Lottie from "lottie-react";

const HabitDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [habit, setHabit] = useState(null);
  const [animationData, setAnimationData] = useState(null);

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
      setHabit((prev) => ({
        ...prev,
        streak: res.data.streak,
        completedDates: res.data.completedDates,
        progress: res.data.progress,
      }));

      toast.success(res.data.message || "Habit marked complete!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark complete");
    }
  };

  useEffect(() => {
    fetch("/Fire Streak Orange.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (loading) return <Loader />;
  if (!habit)
    return <p className="text-center text-gray-500 mt-10">Habit not found</p>;

  return (
    <motion.div
      className="bg-[#e0f6fa] min-h-screen py-10"
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
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

        <div className="mb-4 flex items-center">
          <span className="flex items-center bg-[#65CFE6] text-[#03045E] text-sm px-3 py-1 rounded-full font-medium">
            <span className="h-10 w-10 flex items-center pb-1 justify-center">
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                />
              )}
            </span>{" "}
            <span className="pr-3">
              Streak: {habit.streak || 0} day{habit.streak !== 1 ? "s" : ""}
            </span>
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

        <button
          onClick={handleMarkComplete}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Mark Complete
        </button>
      </div>
    </motion.div>
  );
};

export default HabitDetails;
