import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">MeetVoice</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white text-lg">
          <li><NavLink to="/" className="hover:text-gray-300">Home</NavLink></li>
          <li><NavLink to="/pricing" className="hover:text-gray-300">Pricing</NavLink></li>
          <li><NavLink to="/developer" className="hover:text-gray-300">About Developer</NavLink></li>
        </ul>

        {/* Call to Action */}
        <NavLink to="/start" className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200">
          Get Started
        </NavLink>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md p-4 space-y-4 text-center text-lg text-gray-800">
          <li><NavLink to="/" className="block hover:text-blue-600">Home</NavLink></li>
          <li><NavLink to="/pricing" className="block hover:text-blue-600">Pricing</NavLink></li>
          <li><NavLink to="/developer" className="block hover:text-blue-600">About Developer</NavLink></li>
          <li><NavLink to="/start" className="w-full p-4 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
            Get Started
          </NavLink></li>
        </ul>
      )}
    </nav>
  );
}
