import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Habit from "./Habit";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { fadeIn } from "../../Utilities/Varients";

const Habites = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

useEffect(() => {
  const fetchHabits = async () => {
    try {
      const res = await axios.get("https://habit-tracker-server-five.vercel.app/habits"); 
      setHabits(res.data);
    } catch (error) {
      console.error("Failed to fetch habits:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchHabits();
}, [axios]);


  const habitsSlice = habits.slice(0, 6);

  if (loading) return <Loader></Loader>

  return (
    <div className="container mx-auto">
      <h2 className="text-[#03045E] dark:text-white font-bold text-3xl text-center py-10">Habites</h2>
      <p className="text-gray-600 dark:text-white max-w-2xl mx-auto mb-12 text-center">
        Explore our collection of habits and start building positive routines today!
      </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
  {habitsSlice.map((habit, index) => (
    <motion.div
      key={habit._id}
      variants={fadeIn("up", index * 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <Habit habit={habit} />
    </motion.div>
  ))}
</div>

    </div>
  );
};

export default Habites;
