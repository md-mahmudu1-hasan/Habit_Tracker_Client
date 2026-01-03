import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Habit from "../Home/Habit";
import Lottie from "lottie-react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { fadeIn } from "../../Utilities/Varients";

const BrowsePublic = () => {
  const axios = useAxios();
  const [habits, setHabits] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

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

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentHabits = filteredHabits.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredHabits.length / cardsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-[#e0f6fa] dark:bg-slate-900 min-h-screen">
      <div className="pt-17 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <h2 className="text-[#03045E] dark:text-sky-400 font-bold text-3xl text-center py-10">
          Public Habits
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mb-12">
          Habits are repeated actions that shape your behavior and define your lifestyle.
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

          <div className="absolute md:mb-15 mb-27 right-2 md:right-138 h-8 w-32">
            {animationData && <Lottie animationData={animationData} loop autoplay />}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
          {currentHabits.length > 0 ? (
            currentHabits.map((habit) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold text-white ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#03045E] hover:bg-[#03045E]/90 dark:bg-sky-600 dark:hover:bg-sky-500"
              }`}
            >
              Prev
            </button>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold text-white ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#03045E] hover:bg-[#03045E]/90 dark:bg-sky-600 dark:hover:bg-sky-500"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePublic;
