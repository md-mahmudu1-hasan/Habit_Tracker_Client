import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";

const AddHabit = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    try {
      await axios.post("/habits", habitData);
      e.target.reset();
      toast.success("Habit added successfully");
    } catch {
      toast.error("Failed to add habit");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-[#e0f6fa] dark:bg-slate-900 min-h-screen">
      <div className="mt-12 flex justify-center items-center py-10 px-4">
        <div
          className="
          bg-white dark:bg-slate-800
          shadow-2xl rounded-2xl
          p-8 w-full max-w-2xl
          border border-[#90E0EF] dark:border-slate-700
        "
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-[#0077B6] dark:text-sky-400">
            Add a New Habit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter habit title"
                className="
                w-full p-3 rounded-lg
                border border-gray-300 dark:border-slate-600
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
                outline-none
              "
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe your habit..."
                className="
                w-full p-3 rounded-lg
                border border-gray-300 dark:border-slate-600
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
                outline-none
              "
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Category
              </label>
              <select
                name="category"
                className="
                w-full p-3 rounded-lg
                border border-gray-300 dark:border-slate-600
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
                outline-none
              "
                required
              >
                <option value="">Select Category</option>
                <option value="Morning">Morning</option>
                <option value="Work">Work</option>
                <option value="Fitness">Fitness</option>
                <option value="Evening">Evening</option>
                <option value="Study">Study</option>
              </select>
            </div>

            {/* Reminder Time */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                className="
                w-full p-3 rounded-lg
                border border-gray-300 dark:border-slate-600
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
                outline-none
              "
              />
            </div>

            {/* Image */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="
                w-full p-3 rounded-lg
                border border-gray-300 dark:border-slate-600
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-[#00B4D8] dark:focus:ring-sky-500
                outline-none
              "
                required
              />
            </div>

            {/* User Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="
                  w-full p-3 rounded-lg
                  border border-gray-300 dark:border-slate-600
                  bg-gray-100 dark:bg-slate-700
                  text-gray-600 dark:text-gray-300
                  cursor-not-allowed
                "
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="
                  w-full p-3 rounded-lg
                  border border-gray-300 dark:border-slate-600
                  bg-gray-100 dark:bg-slate-700
                  text-gray-600 dark:text-gray-300
                  cursor-not-allowed
                "
                />
              </div>
            </div>

            {/* Submit */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="
                w-full py-3 rounded-lg font-semibold text-white
                bg-linear-to-r from-[#00B4D8] to-[#0077B6]
                dark:from-sky-600 dark:to-cyan-600
                hover:scale-[1.02] transition-transform
              "
              >
                Add Habit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
