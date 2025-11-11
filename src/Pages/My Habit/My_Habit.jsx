import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Habit from "../Home/Habit";

const My_Habit = () => {
  const [habits, setHabits] = useState([]);
  const axios = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`/habits?email=${user?.email}`).then((res) => {
      setHabits(res.data);
    });
  }, [axios, user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-19">
      <h1 className="text-2xl font-bold text-center mb-4 text-[#02449a]">My Habit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {habits.length === 0 ? (
          <p className="text-center text-[#02449a]">No habits found</p>
        ) : (
          habits.map((habit) => <Habit key={habit._id} habit={habit}></Habit>)
        )}
      </div>
    </div>
  );
};

export default My_Habit;
