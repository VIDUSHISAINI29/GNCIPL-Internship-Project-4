import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Transactions", path: "/transactions" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 min-h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6">Menu</h2>
      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="cursor-pointer p-2 rounded hover:bg-primary hover:text-white transition"
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
