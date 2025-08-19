import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User } from "lucide-react"; 

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // controls dropdown

  const navLinks = [
    { name: "Portfolio", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-background text-black dark:text-textLight shadow-md px-6 py-4 flex justify-between items-center relative dark:border-b dark:border-gray-700">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl md:text-2xl font-bold cursor-pointer text-gold"
      >
        📊 Stock Portfolio
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`transition font-medium ${
              isActive(link.path) ? "text-gold" : "hover:text-brightGold"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4 relative">
        <ThemeToggle />

        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 rounded-full bg-surface hover:shadow-gold transition"
            >
              <User className="w-6 h-6 text-gold" />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg py-2 flex flex-col z-50
                              bg-white dark:bg-surface 
                              border border-gray-200 dark:border-gray-700
                              transition-colors duration-300">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 text-left text-gray-800 dark:text-textLight 
                             hover:bg-gray-100 dark:hover:bg-[#2a2a2a] 
                             transition-colors duration-300"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="px-4 py-2 text-left text-gray-800 dark:text-textLight 
                             hover:bg-gray-100 dark:hover:bg-[#2a2a2a] 
                             transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-gold text-background font-semibold hover:bg-brightGold transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg border border-gold text-gold font-semibold hover:bg-gold hover:text-background transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gold focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full shadow-lg flex flex-col items-start px-6 py-4 gap-4 md:hidden
                        bg-white dark:bg-surface transition-colors duration-300 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`w-full text-lg font-medium ${
                isActive(link.path) ? "text-gold" : "hover:text-brightGold"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <ThemeToggle />

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gold dark:text-[#000]  font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <User className="w-5 h-5" /> Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-negative text-white  dark:text-[#000] dark:hover:bg-[#2A2A2A] transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg bg-gold text-background font-semibold hover:bg-brightGold transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg border border-gold text-gold font-semibold hover:bg-gold hover:text-background transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
