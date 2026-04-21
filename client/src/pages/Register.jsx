import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input className="w-full border p-2 mb-4" type="text" placeholder="Name" />
        <input className="w-full border p-2 mb-4" type="email" placeholder="Email"/>
        <input className="w-full border p-2 mb-4" type="password" placeholder="password"/>

        <button className="bg-green-600 text-white w-full py-2 rounded-2xl">Register</button>
      </form>
    </div>
  );
};

export default Register;
