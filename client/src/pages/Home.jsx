import React from "react";

import api from "./../services/Api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Build Resume with AI
        </h1>

        <p className="text-lg text-gray-600">
          Generate ATS Friendly Resume in Seconds
        </p>

        <button className="bg-blue-600 px-6 py-3 text-white rounded-lg hover:bg-blue-800">
          <Link to="/register">Get Started</Link>
        </button>
      </div>
    </>
  );
};

export default Home;
