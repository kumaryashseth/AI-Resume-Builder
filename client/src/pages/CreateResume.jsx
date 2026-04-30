import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import { getToken } from "../services/Auth";
import toast from "react-hot-toast";

const CreateResume = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    education: [],
    experience: [],
    projects: [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...form[field]];
    updatedArray[index] = value;
    setForm({
      ...form,
      [field]: updatedArray,
    });
  };

  const addField = (field) => {
    setForm({
      ...form,
      [field]: [...form[field], ""],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const token=getToken();

    try {
      const res = await api.post("/resume/create", form,{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Create Resume</h1>

        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Enter Full Name"
          className="border p-3 w-full mb-4"
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter Email"
          className="border p-3 w-full mb-4"
        />

        <input
          type="text"
          name="phone"
          onChange={handleChange}
          placeholder="Enter Phone Number"
          className="border p-3 w-full mb-4"
        />

        <input
          type="text"
          name="summary"
          onChange={handleChange}
          placeholder="Enter Summary"
          row="4"
          className="border p-3 w-full mb-4"
        />

        <h2 className="font-bold mb-2">Skills</h2>

        {form.skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            name="skills"
            onChange={(e) => handleArrayChange(index, "skills", e.target.value)}
            placeholder="Enter Skill"
            className="border p-3 w-full mb-4"
          />
        ))}

        <button type="button" onClick={() => addField("skills")} className="bg-gray-500 text-white px-4 py-2 rounded">
          +Add Skills
        </button>

        <h2 className="font-bold mb-2">Education</h2>

        {form.education.map((edu, index) => (
          <input
            key={index}
            type="text"
            name="education"
            onChange={(e) => handleArrayChange(index, "education", e.target.value)}
            placeholder="Enter Education"
            className="border p-3 w-full mb-4"
          />
        ))}

        <button type="button" onClick={() => addField("education")} className="bg-gray-500 text-white px-4 py-2 rounded">
          +Add Education
        </button>

        <h2 className="font-bold mb-2">Experience</h2>

        {form.experience.map((exp, index) => (
          <input
            key={index}
            type="text"
            name="experience"
            onChange={(e) => handleArrayChange(index, "experience", e.target.value)}
            placeholder="Enter Experience"
            className="border p-3 w-full mb-4"
          />
        ))}

        <button type="button" onClick={() => addField("experience")} className="bg-gray-500 text-white px-4 py-2 rounded">
          +Add Experience
        </button>

        <h2 className="font-bold mb-2">Projects</h2>

        {form.projects.map((proj, index) => (
          <input
            key={index}
            type="text"
            name="projects"
            onChange={(e) => handleArrayChange(index, "projects", e.target.value)}
            placeholder="Enter Project"
            className="border p-3 w-full mb-4"
          />
        ))} 

        <button type="button" onClick={() => addField("projects")} className="bg-gray-500 text-white px-4 py-2 rounded">
          +Add Project
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Generate Resume
        </button>



      </form>
    </div>
  );
};

export default CreateResume;
