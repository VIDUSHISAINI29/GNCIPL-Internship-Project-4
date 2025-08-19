import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background text-black dark:text-textLight border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand / Logo */}
        <div className="text-center md:text-left">
          <span className="text-gold font-bold text-lg">📊 Stock Portfolio</span>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Track your investments with ease
          </p>
        </div>

        {/* Links */}
     

        {/* Copyright */}
        <div className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Stock Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
