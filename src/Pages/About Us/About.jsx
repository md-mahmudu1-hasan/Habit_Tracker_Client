import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-17 from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-black/40 p-6 sm:p-10">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          About Habit Tracker
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-6">
          Habit Tracker is a web app designed to help users build and maintain productive habits.
          Users can add, update, delete, and mark habits complete, track their progress visually, 
          and explore public habits created by others.
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Key Features
          </h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>Users can create, track, and manage daily habits.</li>
            <li>Add habits with category, reminder time, and optional image upload.</li>
            <li>My Habits table with update, delete, and mark complete options.</li>
            <li>Browse public habits with search and category filter.</li>
            <li>Track progress with progress bars and streak badges.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Habit Tracker is designed to make habit building simple, visual, and engaging. 
            Start creating your productive habits today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
