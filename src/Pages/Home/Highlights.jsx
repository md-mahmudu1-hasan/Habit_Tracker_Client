import React from "react";
import { Sparkles, Target, TrendingUp } from "lucide-react";

const Highlights = () => {
  return (
    <section className="py-16 bg-[#e0f6fa] dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center dark:text-sky-400">
          Highlights
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Sparkles size={36} />,
              title: "Simple & Clean UI",
              desc: "Minimal design that keeps you focused on your habits.",
            },
            {
              icon: <Target size={36} />,
              title: "Goal Oriented",
              desc: "Track progress clearly and achieve goals step by step.",
            },
            {
              icon: <TrendingUp size={36} />,
              title: "Growth Focused",
              desc: "Visual progress and streaks help you grow consistently.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                p-6 rounded-2xl text-center
                bg-white dark:bg-slate-900
                border border-sky-100 dark:border-slate-800
                shadow hover:shadow-xl transition
              "
            >
              <div className="flex justify-center text-[#0077B6] dark:text-sky-300 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#03045E] dark:text-gray-100">
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

export default Highlights;
