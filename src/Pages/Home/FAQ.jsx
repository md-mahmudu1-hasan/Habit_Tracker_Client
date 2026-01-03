import React, { useState } from "react";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is a habit tracker?",
      a: "It helps you build good habits by tracking daily actions and consistency.",
    },
    {
      q: "Is this app free?",
      a: "Yes, the habit tracker is free to use.",
    },
    {
      q: "Can I use it on mobile?",
      a: "Yes, the app is fully responsive and mobile-friendly.",
    },
    {
      q: "How does streak work?",
      a: "Your streak increases when you complete a habit without missing days.",
    },
  ];

  return (
    <section className="py-16 dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center dark:text-white text-[#03045E]">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="
                rounded-xl shadow
                bg-[#F8FDFF] dark:bg-slate-900
                border border-sky-100 dark:border-slate-800
              "
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="
                  w-full px-5 py-4 flex justify-between items-center
                  text-left font-semibold
                  text-[#0077B6] dark:text-sky-300
                "
              >
                {item.q}
                <span>{open === i ? "−" : "+"}</span>
              </button>

              {open === i && (
                <div className="px-5 pb-4 text-gray-600 dark:text-gray-400">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
