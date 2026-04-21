import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="text-2xl p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          className="w-full border p-2 mb-4"
          type="email"
          placeholder="email"
        />
        <input
          className="w-full border p-2 mb-4"
          type="password"
          placeholder="password"
        />
        <button
          className="bg-blue-600 text-white w-full py-2 rounded-4xl"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
