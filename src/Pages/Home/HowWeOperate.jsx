import React from "react";

const HowWeOperate = () => {
  return (
    <section className="py-16 dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center dark:text-white text-[#03045E] dark:text-sky-400">
          How We Operate
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Create Habit",
              desc: "Add habits you want to build with clear goals.",
            },
            {
              step: "02",
              title: "Track Progress",
              desc: "Mark habits complete every day with a single click.",
            },
            {
              step: "03",
              title: "Analyze Growth",
              desc: "View streaks and improve based on consistency.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                p-8 rounded-2xl shadow
                bg-white dark:bg-slate-900
                border border-sky-100 dark:border-slate-800
              "
            >
              <span className="text-5xl font-bold text-[#00B4D8] dark:text-sky-500">
                {item.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-[#03045E] dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeOperate;
