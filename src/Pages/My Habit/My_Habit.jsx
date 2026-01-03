import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const My_Habit_Table = () => {
  const [habits, setHabits] = useState([]);
  const [modalHabit, setModalHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  const axios = useAxios();
  const { user } = useAuth();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;
    axios.get(`/habits?email=${user.email}`)
      .then(res => setHabits(res.data))
      .finally(() => setLoading(false));
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
          setHabits(prev => prev.filter(h => h._id !== id));
          Swal.fire("Deleted!", "Habit has been deleted.", "success");
        });
      }
    });
  };

  const handleModal = (id) => {
    modalRef.current.showModal();
    axios.get(`/habits/${id}`).then(res => {
      setModalHabit(res.data);
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

    axios.patch(`/habits/${modalHabit._id}`, habitData).then(() => {
      modalRef.current.close();
      toast.success("Habit updated successfully");

      setHabits(prev =>
        prev.map(h =>
          h._id === modalHabit._id ? { ...h, ...habitData } : h
        )
      );
    });
  };

  const handleMarkComplete = async (id) => {
    try {
      const res = await axios.patch(`/habits/${id}/complete`);
      setHabits(prev =>
        prev.map(h =>
          h._id === id
            ? {
                ...h,
                streak: res.data.streak,
                completedDates: res.data.completedDates,
              }
            : h
        )
      );
      toast.success(res.data.message || "Habit marked complete!");
    } catch (err) {
      toast.error("Failed to mark complete");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="max-w-7xl mt-16 mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#02449a] dark:text-[#90E0EF]">
          My Habits
        </h1>

        {habits.length === 0 ? (
          <p className="text-center font-bold text-2xl text-[#02449a] dark:text-[#90E0EF]">
            No habits found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg">
              <thead className="bg-[#0096C7] dark:bg-[#023E8A] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Streak</th>
                  <th className="py-3 px-6 text-left">Created</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map(habit => (
                  <tr key={habit._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="py-3 px-6 text-gray-800 dark:text-gray-100">{habit.Title}</td>
                    <td className="py-3 px-6 text-gray-800 dark:text-gray-100">{habit.Category}</td>
                    <td className="py-3 px-6 text-gray-800 dark:text-gray-100">
                      {habit.streak || 0} day{habit.streak !== 1 ? "s" : ""}
                    </td>
                    <td className="py-3 px-6 text-gray-800 dark:text-gray-100">
                      {new Date(habit.createAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center space-x-2">
                      <button
                        onClick={() => handleModal(habit._id)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded dark:bg-yellow-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded dark:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleMarkComplete(habit._id)}
                        className="bg-[#2B7FFF] text-white px-3 py-1 rounded dark:bg-[#023E8A]"
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
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
          {modalHabit && (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                name="title"
                defaultValue={modalHabit.Title}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                required
              />

              <textarea
                name="description"
                defaultValue={modalHabit.Description}
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white"
              />

              <select
                name="category"
                defaultValue={modalHabit.Category}
                className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
              >
                <option>Morning</option>
                <option>Work</option>
                <option>Fitness</option>
                <option>Evening</option>
                <option>Study</option>
              </select>

              <input
                type="time"
                name="reminderTime"
                defaultValue={modalHabit.ReminderTime}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              />

              <input
                name="image"
                defaultValue={modalHabit.Image}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              />

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary w-full">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => modalRef.current.close()}
                  className="btn w-full"
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
};

export default My_Habit_Table;
