import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-3 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-amber-400">MyApp</h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-amber-400 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-amber-400 transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-amber-400 transition">
          Contact
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;