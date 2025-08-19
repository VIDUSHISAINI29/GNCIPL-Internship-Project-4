import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios.js"; // 👈 use api (public)

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form); // 👈 token not attached
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating account");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-surface p-8 rounded-2xl shadow-lg w-96 
                   border border-gray-200 dark:border-gold/30"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gold">
          Signup
        </h1>

        {/* Name */}
        <input
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-gray-50 dark:bg-background 
                     text-black dark:text-textLight focus:outline-none 
                     focus:ring-2 focus:ring-gold transition"
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-gray-50 dark:bg-background 
                     text-black dark:text-textLight focus:outline-none 
                     focus:ring-2 focus:ring-gold transition"
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-gray-50 dark:bg-background 
                     text-black dark:text-textLight focus:outline-none 
                     focus:ring-2 focus:ring-gold transition"
          onChange={handleChange}
          required
        />

        {/* Role */}
        <select
          name="role"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-gray-50 dark:bg-background 
                     text-black dark:text-textLight focus:outline-none 
                     focus:ring-2 focus:ring-gold transition"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gold text-background font-semibold p-3 rounded-lg 
                     hover:bg-brightGold hover:shadow-gold transition"
        >
          Signup
        </button>

        {/* Redirect */}
        <p className="mt-4 text-center text-gray-700 dark:text-textLight">
          Already have an account?{" "}
          <span
            className="text-gold font-semibold cursor-pointer hover:text-brightGold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
