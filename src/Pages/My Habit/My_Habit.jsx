import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const My_Habit_Table = () => {
  const [habits, setHabits] = useState([]);
  const [Modalhabit, setModalhabit] = useState({});
  const axios = useAxios();
  const { user } = useAuth();
  const productRef = useRef(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`/habits?email=${user?.email}`).then((res) => {
      setHabits(res.data);
      setLoading(false);
    });
  }, [axios, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/habits/${id}`).then(() => {
          setHabits(habits.filter((habit) => habit._id !== id));
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleModal = (id) => {
    productRef.current.showModal();
    axios.get(`/habits/${id}`).then((res) => {
      setModalhabit(res.data);
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const habitData = {
      Title: e.target.title.value,
      Description: e.target.description.value,
      Category: e.target.category.value,
      ReminderTime: e.target.reminderTime.value,
      Image: e.target.image.value,
      createAt: new Date().toISOString(),
      Username: user?.displayName,
      UserEmail: user?.email,
      UserImage: user?.photoURL,
    };

    axios.patch(`/habits/${Modalhabit._id}`, habitData).then(() => {
      productRef.current.close();
      toast.success("Habit updated successfully");
      setHabits(
        habits.map((habit) =>
          habit._id === Modalhabit._id ? { ...habit, ...habitData } : habit
        )
      );
    });
  };

const handleMarkComplete = async (id) => {
  try {
    const res = await axios.patch(`/habits/${id}/complete`);
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit._id === id
          ? { ...habit, streak: res.data.streak, completedDates: res.data.completedDates }
          : habit
      )
    );
    toast.success(res.data.message || "Habit marked complete!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to mark complete");
  }
};

  if (loading) return <Loader></Loader>;

  return (
    <>
      <div className="max-w-7xl mt-17 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#02449a]">
          My Habits
        </h1>

        {habits.length === 0 ? (
          <p className="text-center font-bold text-2xl text-[#02449a]">No habits found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-[#0096C7] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Current Streak</th>
                  <th className="py-3 px-6 text-left">Created Date</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr
                    key={habit._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-6">{habit.Title}</td>
                    <td className="py-3 px-6">{habit.Category}</td>
                    <td className="py-3 px-6">
                      {habit?.streak || 0} day{habit?.streak !== 1 ? "s" : ""}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(habit.createAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center space-x-2">
                      <button
                        onClick={() => handleModal(habit._id)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleMarkComplete(habit._id)}
                        className="bg-[#2B7FFF] text-white px-3 py-1 rounded hover:bg-[#063986] transition"
                      >
                        Mark Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Modal */}

      <dialog id="my_modal_1" ref={productRef} class="modal">
        <div class="modal-box">
          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter habit title"
                defaultValue={Modalhabit?.Title}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe your habit..."
                defaultValue={Modalhabit?.Description}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
                required
                value={Modalhabit?.Category}
              >
                <option value="">Select Category</option>
                <option value="Morning">Morning</option>
                <option value="Work">Work</option>
                <option value="Fitness">Fitness</option>
                <option value="Evening">Evening</option>
                <option value="Study">Study</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
                defaultValue={Modalhabit?.ReminderTime}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
                defaultValue={Modalhabit?.Image}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full p-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <button
                type="submit"
                className="py-2 w-1/2 bg-linear-to-r from-[#00B4D8] to-[#0077B6] text-white font-semibold rounded-lg hover:scale-[1.02] transition-transform"
              >
                Add Habit
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default My_Habit_Table;
