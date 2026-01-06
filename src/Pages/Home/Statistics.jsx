import React from "react";
import { Users, Flame, CheckCircle } from "lucide-react";

const Statistics = () => {
  return (
    <section className="py-16 bg-[#e0f6fa] dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center dark:text-sky-400">
          Our Impact
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Users size={36} />,
              value: "5K+",
              label: "Active Users",
            },
            {
              icon: <Flame size={36} />,
              value: "120K+",
              label: "Habits Tracked",
            },
            {
              icon: <CheckCircle size={36} />,
              value: "85%",
              label: "Success Rate",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="
                p-8 rounded-2xl text-center
                bg-white dark:bg-slate-900
                border border-sky-100 dark:border-slate-800
                shadow
              "
            >
              <div className="flex justify-center text-[#00B4D8] dark:text-sky-400 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-[#03045E] dark:text-gray-100">
                {stat.value}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
