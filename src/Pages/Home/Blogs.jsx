import React from "react";
import { BookOpen } from "lucide-react";

const Blogs = () => {
  return (
    <section className="py-16 bg-[#e0f6fa] dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center dark:text-sky-400">
          Latest Blogs
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="
                p-6 rounded-2xl
                bg-white dark:bg-slate-900
                border border-sky-100 dark:border-slate-800
                shadow hover:shadow-xl transition
              "
            >
              <div className="text-[#0077B6] dark:text-sky-300 mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#03045E] dark:text-gray-100">
                How Small Habits Change Life
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Learn how daily habits can create massive long-term impact.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
