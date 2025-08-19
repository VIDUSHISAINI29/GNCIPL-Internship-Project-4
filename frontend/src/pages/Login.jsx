import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/user-portfolio");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-surface p-8 rounded-2xl shadow-lg w-96 
                   border border-gray-200 dark:border-gold/30"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gold">
          Login
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-gray-50 dark:bg-background 
                     text-black dark:text-textLight focus:outline-none 
                     focus:ring-2 focus:ring-gold transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-gray-50 dark:bg-background 
                     text-black dark:text-textLight focus:outline-none 
                     focus:ring-2 focus:ring-gold transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gold text-background font-semibold p-3 rounded-lg 
                     hover:bg-brightGold hover:shadow-gold transition"
        >
          Login
        </button>

        {/* Signup Redirect */}
        <p className="mt-4 text-center text-gray-700 dark:text-textLight">
          Don&apos;t have an account?{" "}
          <span
            className="text-gold font-semibold cursor-pointer hover:text-brightGold"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
