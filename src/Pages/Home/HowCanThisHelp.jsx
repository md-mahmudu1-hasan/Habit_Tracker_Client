import React from "react";
import { Flame, Dumbbell, Zap } from "lucide-react";

const HowCanThisHelp = () => {
  return (
    <section className="py-16 dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#03045E] dark:text-white">
          How Can This Help You?
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div
            className="
              p-6 rounded-2xl shadow
              bg-white dark:bg-slate-900
              border border-sky-100 dark:border-slate-800
              hover:shadow-xl transition
            "
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#CAF0F8] dark:bg-slate-800 mb-4">
              <Flame className="text-[#0077B6] dark:text-sky-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              Build Consistency
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Develop strong habits by tracking your daily progress visually.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
              p-6 rounded-2xl shadow
              bg-white dark:bg-slate-900
              border border-sky-100 dark:border-slate-800
              hover:shadow-xl transition
            "
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#CAF0F8] dark:bg-slate-800 mb-4">
              <Dumbbell className="text-[#0077B6] dark:text-sky-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              Stay Motivated
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Streaks and milestones keep you motivated every day.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
              p-6 rounded-2xl shadow
              bg-white dark:bg-slate-900
              border border-sky-100 dark:border-slate-800
              hover:shadow-xl transition
            "
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#CAF0F8] dark:bg-slate-800 mb-4">
              <Zap className="text-[#0077B6] dark:text-sky-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              Improve Productivity
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Organize habits clearly and focus on what matters most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowCanThisHelp;

