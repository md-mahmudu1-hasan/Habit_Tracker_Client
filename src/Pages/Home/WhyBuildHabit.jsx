import { FaBrain, FaSmile, FaBullseye, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../Utilities/Varients";

const WhyBuildHabits = () => {
  const benefits = [
    {
      icon: <FaBullseye size={30} className="text-blue-500" />,
      title: "Better Focus",
      desc: "Regular habits improve concentration and help you stay consistent on your goals.",
    },
    {
      icon: <FaSmile size={30} className="text-yellow-500" />,
      title: "Reduced Stress",
      desc: "Good habits bring structure and peace to your daily routine, lowering anxiety levels.",
    },
    {
      icon: <FaBrain size={30} className="text-purple-500" />,
      title: "Personal Growth",
      desc: "Building habits boosts discipline, self control, and personal development.",
    },
    {
      icon: <FaHeart size={30} className="text-red-500" />,
      title: "Healthier Lifestyle",
      desc: "Positive habits like exercise and meditation improve both mental and physical health.",
    },
  ];

  return (
    <motion.section variants={fadeIn("up", 0.3)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">
          Why Build Habits?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Building positive habits is the foundation of a successful, balanced,
          and fulfilling life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 transition duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyBuildHabits;
