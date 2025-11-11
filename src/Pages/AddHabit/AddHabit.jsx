import React from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const AddHabit = () => {
  const { user } = useAuth();
  const axios = useAxios();

  const handleSubmit = async (e) => {
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

    axios.post("/habits", habitData).then(() => {
      e.target.reset();
      toast.success("Habit added successfully");
    });
  };

  return (
    <div className="bg-[#e0f6fa]">
      <div className="mt-12 flex justify-center items-center py-10 px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-[#90E0EF]">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#0077B6]">
            Add a New Habit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter habit title"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe your habit..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
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

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00B4D8] outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-[#00B4D8] to-[#0077B6] text-white font-semibold rounded-lg hover:scale-[1.02] transition-transform"
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
