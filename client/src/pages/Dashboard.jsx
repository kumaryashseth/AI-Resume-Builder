import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getUser } from "../services/auth";

const Dashboard = () => {
  const user = getUser();
  return (
    <>
      <h2 className="text-2xl text-blue-500 text-center font-bold">
        Welcome {user.name}
      </h2>

      <div className="grid">
        <div className="bg-white p-6 rounded-xl shadow block">
          <Link
            to="/create-resume"
            className="bg-white p-6 rounded-b-xl shadow block"
          >
            Create Resume
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow block">
          <Link
            to="/my-resumes"
            className="bg-white p-6 rounded-b-xl shadow block"
          >
            My Resumes
          </Link>
        </div>
        

        
        <div className="bg-white p-6 rounded-xl shadow block">
          <Link
            to="/my-resumes"
            className="bg-green-500 text-white p-6 py-2 rounded-b-xl shadow block"
          >
            Edit Resume
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
             <Link
            to="/ai-tools"
            className="bg-blue-500 text-white p-6 py-2 rounded-b-xl shadow block"
          >
             AI TOOLS
          </Link>
           </h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
