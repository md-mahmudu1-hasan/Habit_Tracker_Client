import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2">
            <img
              src="/Assets/Habit.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-xl font-semibold text-white">HabitTracker</h2>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Build good habits and improve your daily lifestyle easily.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@habittracker.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Legal Info
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HabitTracker All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
