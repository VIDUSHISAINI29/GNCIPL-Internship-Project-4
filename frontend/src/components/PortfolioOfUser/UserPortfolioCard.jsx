import React from "react";

export default function UserPortfolioCard({ title, value, isProfit }) {
  return (
    <div
      className={`p-6 rounded-xl border shadow-gold-sm 
        bg-white text-black border-gray-200
        dark:bg-surface dark:text-textLight dark:border-gray-700
        transition duration-400 hover:shadow-gold
        ${
          isProfit === undefined
            ? ""
            : isProfit
            ? "text-positive"
            : "text-negative"
        }`}
    >
      <h3 className="text-lg font-semibold text-gold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
