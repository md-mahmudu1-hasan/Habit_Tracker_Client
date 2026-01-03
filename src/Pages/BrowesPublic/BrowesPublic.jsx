import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Habit from "../Home/Habit";
import Lottie from "lottie-react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { fadeIn } from "../../Utilities/Varients";

const BrowesPublic = () => {
  const axios = useAxios();
  const [habits, setHabits] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Loading 40 _ Paperplane.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get("/habits");
        setHabits(res.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchHabits();
  }, [axios]);

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.Title.toLowerCase().startsWith(
      searchText.toLowerCase()
    );
    const matchesCategory =
      filterCategory === "All" || habit.Category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loader />;

  return (
    <div className="bg-[#e0f6fa] dark:bg-slate-900 min-h-screen">
      <div className="pt-17 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <h2 className="text-[#03045E] dark:text-sky-400 font-bold text-3xl text-center py-10">
          Public Habits
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mb-12">
          Habits are repeated actions that shape your behavior and define your
          lifestyle.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 relative">
          <input
            type="text"
            placeholder="Search by title..."
            className="
              border border-gray-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-gray-800 dark:text-gray-100
              rounded-md px-4 py-2
              w-full md:w-1/3
              focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
              outline-none
            "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Lottie Animation */}
          <div className="absolute md:mb-15 mb-27 right-2 md:right-138 h-8 w-32">
            {animationData && (
              <Lottie animationData={animationData} loop autoplay />
            )}
          </div>

          <select
            className="
              border border-gray-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-gray-800 dark:text-gray-100
              rounded-md px-4 py-2
              w-full md:w-1/4
              focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
              outline-none
            "
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <motion.div
                key={habit._id}
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                <Habit habit={habit} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-3 text-[#03045E] dark:text-sky-400 font-medium text-2xl">
              No habits found for your search/filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowesPublic;
