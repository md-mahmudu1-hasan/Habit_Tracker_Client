import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Habit from "../Home/Habit";
// import Lottie from "lottie-react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { fadeIn } from "../../Utilities/Varients";

const BrowsePublic = () => {
  const axios = useAxios();
  const [habits, setHabits] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortType, setSortType] = useState("newest");
  // const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  // useEffect(() => {
  //   fetch("/Loading 40 _ Paperplane.json")
  //     .then((res) => res.json())
  //     .then((data) => setAnimationData(data));
  // }, []);

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

  // 🔍 Filter + Search
  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.Title.toLowerCase().startsWith(
      searchText.toLowerCase()
    );
    const matchesCategory =
      filterCategory === "All" || habit.Category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // 🔃 Sorting
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortType === "az") {
      return a.Title.localeCompare(b.Title);
    }
    if (sortType === "za") {
      return b.Title.localeCompare(a.Title);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentHabits = sortedHabits.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(sortedHabits.length / cardsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) return <Loader />;

  return (
    <div className="bg-[#e0f6fa] dark:bg-slate-900 min-h-screen">
      <div className="pt-17 max-w-7xl mx-auto px-4 relative">
        <h2 className="text-[#03045E] dark:text-sky-400 font-bold text-3xl text-center py-10">
          Public Habits
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mb-12">
          Habits are repeated actions that shape your behavior and define your lifestyle.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-8 relative">
          <input
            type="text"
            placeholder="Search by title..."
            className="
              border border-gray-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-gray-800 dark:text-gray-100
              rounded-md px-4 py-2
              w-full lg:w-1/4
              focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
              outline-none
            "
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="
              border border-gray-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-gray-800 dark:text-gray-100
              rounded-md px-4 py-2
              w-full lg:w-1/5
              focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
              outline-none
            "
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>

          <select
            className="
              border border-gray-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-gray-800 dark:text-gray-100
              rounded-md px-4 py-2
              w-full lg:w-1/5
              focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
              outline-none
            "
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="az">Title A → Z</option>
            <option value="za">Title Z → A</option>
          </select>

          {/* Lottie */}
          {/* <div className="absolute right-0 top-[-20px] hidden md:block w-28">
            {animationData && (
              <Lottie animationData={animationData} loop autoplay />
            )}
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentHabits.length ? (
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
            <p className="col-span-4 text-center text-[#03045E] dark:text-sky-400 text-xl font-medium">
              No habits found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
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
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
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
