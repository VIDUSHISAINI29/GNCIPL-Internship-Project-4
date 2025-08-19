import React, { useEffect, useState } from "react";

export default function AdminOnlyPage() {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  // Observe dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-500 ${
        isDark ? "bg-background text-textLight" : "bg-white text-black"
      }`}
    >
      <div
        className={`max-w-lg w-full text-center p-8 rounded-2xl shadow-gold-sm transition-colors duration-500 ${
          isDark ? "bg-surface shadow-gold" : "bg-white shadow-gold-sm"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gold dark:text-brightGold drop-shadow-gold">
          Access Restricted
        </h1>
        <p className="text-lg sm:text-xl">
          This page is available for <span className="font-semibold text-gold dark:text-brightGold">admins only</span>.
        </p>
      </div>
    </div>
  );
}
