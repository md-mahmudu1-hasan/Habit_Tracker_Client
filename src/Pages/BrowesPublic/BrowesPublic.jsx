import React, { useEffect, useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import Habit from '../Home/Habit';

const BrowesPublic = () => {
    
    const axios = useAxios();
    const [habits, setHabits] = useState([]);
    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await axios.get("/habits");
                setHabits(res.data);
            } catch (err) {
                console.log("Error fetching habits:", err);
            }
        };
        return () => {
            fetchHabits();
        };
    }, [axios]);


  return (
    <div className='bg-[#e0f6fa] pt-17'> 
        <h2 className="text-[#03045E] font-bold text-3xl text-center py-10">Public Habits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
            {habits.map((habit) => (
                <Habit key={habit.id} habit={habit}></Habit>
            ))}
        </div>
    </div>
  )
}

export default BrowesPublic