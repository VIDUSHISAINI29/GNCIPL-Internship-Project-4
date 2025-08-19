import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
<button
  onClick={() => setDarkMode(!darkMode)}
  className={`px-4 py-2 rounded-lg font-semibold transition
              ${darkMode ? "ri-sun-fill bg-gold text-background" : "ri-moon-fill bg-gray-200 text-black"}`}
>
</button>

  );
}
