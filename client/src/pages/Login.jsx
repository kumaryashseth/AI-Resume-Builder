import React, { useState } from "react";
import api from "./../services/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form);

      const res = await api.post("/auth/login", form);

      console.log(res.data);

      localStorage.setItem("auth", JSON.stringify(res.data));

      alert("Login Success");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="text-2xl p-8 rounded-lg shadow-md w-96 bg-white"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <input
          className="w-full border p-2 mb-4"
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 mb-4"
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
