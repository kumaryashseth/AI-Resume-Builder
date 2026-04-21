import React, { useState } from "react";
import api from "../services/Api";
import { useNavigate}  from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const navigate=useNavigate()
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", form);
      alert(res.data.message);
      navigate("/login")

    } catch (error) {
      alert(error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          name="name"
          className="w-full border p-2 mb-4"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          className="w-full border p-2 mb-4"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          className="w-full border p-2 mb-4"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white w-full py-2 rounded-2xl">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;