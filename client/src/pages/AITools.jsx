import React, { useState } from "react";
import API from "../services/Api";

const AITools = () => {
  const [role, setRole] = useState("");
  const [bullet, setBullet] = useState("");
  const [result, setResult] = useState("");

  const generateSummary = async () => {
    if (!role.trim()) {
      setResult("Please enter a role before generating a summary.");
      return;
    }

    try {
      const res = await API.post("/ai/summary", {
        role,
      });
      setResult(res.data.summary);
    } catch (error) {
      console.error("AI summary error:", error);
      setResult(error.response?.data?.message || "Failed to generate summary.");
    }
  };

  const improveBullet = async () => {
    if (!bullet.trim()) {
      setResult("Please enter a bullet point to improve.");
      return;
    }

    try {
      const res = await API.post("/ai/improve-bullet", {
        text: bullet,
      });
      setResult(res.data.summary);
    } catch (error) {
      console.error("AI improve-bullet error:", error);
      setResult(error.response?.data?.message || "Failed to improve bullet.");
    }
  };

  const suggestSkills = async () => {
    if (!role.trim()) {
      setResult("Please enter a role before suggesting skills.");
      return;
    }

    try {
      const res = await API.post("/ai/suggest-skills", {
        role,
      });
      setResult(res.data.summary);
    } catch (error) {
      console.error("AI suggest-skills error:", error);
      setResult(error.response?.data?.message || "Failed to suggest skills.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        <h1 className="text-3xl font-bold text-center">AI Resume Tools</h1>

        <input
          type="text"
          placeholder="Enter your role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <div className="flex gap-4">
          <button className="bg-blue-600 text-white rounded-2xl" onClick={generateSummary}>Generate Summary</button>
          <button className="bg-blue-600 text-white rounded-2xl" onClick={suggestSkills}>Suggest Skills</button>
        </div>

        <textarea
          placeholder="Enter Weak Bullet"
          className="border p-2 w-full mb-4"
          value={bullet}
          onChange={(e) => setBullet(e.target.value)}
        />


        <button className="bg-blue-600 text-white rounded-2xl" onClick={improveBullet}>Improve Bullet</button>

        <div className="bg-gray-100 p-4 rounded-2xl whitespace-pre-line">{result}</div>

      </div>
    </div>
  );
};

export default AITools;
