import React from "react";
import { FaClock, FaTasks, FaBell, FaUsers } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaClock size={28} className="text-blue-500" />,
      title: "Habit Reminders",
      desc: "Never miss a habit again. Set customizable reminders to stay on track every day.",
    },
    {
      icon: <FaTasks size={28} className="text-green-500" />,
      title: "Daily Tracking",
      desc: "Track your habits daily and visualize your progress with ease and clarity.",
    },
    {
      icon: <FaBell size={28} className="text-red-500" />,
      title: "Motivational Alerts",
      desc: "Get timely motivational notifications to keep your momentum going.",
    },
    {
      icon: <FaUsers size={28} className="text-purple-500" />,
      title: "Community Support",
      desc: "Join a community of like-minded people and share your habit journey.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Our Key Features
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          HabitTracker is designed to help you build positive habits with easy-to-use features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
