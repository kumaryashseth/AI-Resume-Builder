import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getUser } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        AI Resume Builder
      </Link>

      <div className="space-x-4">

        {isLoggedIn() ? (
          <>
            <span className="text-gray-700">
              Hi, {getUser()?.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;