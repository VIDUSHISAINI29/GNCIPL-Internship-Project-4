import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";


export default function PortfolioCard({ portfolio, onAddHolding, portfolioUsername }) {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSelectedPortfolioId } = useContext(PortfolioContext);
  console.log('card port = ', portfolio)

  return (
    <div className="relative hover:cursor-pointer w-full max-w-sm mx-auto">
      <div
        onClick={() => {
          navigate(`/portfolio/${portfolio._id}`);
          setSelectedPortfolioId(portfolio._id);
        }}
        className="bg-white dark:bg-[#2A2A2A] 
                   text-gray-900 dark:text-textLight 
                   rounded-xl shadow-md p-4 sm:p-5 cursor-pointer
                   border border-transparent 
                   hover:border-gold hover:shadow-gold-sm
                   hover:scale-[1.015] transition-all duration-300"
      >
        {/* Owner */}
        <p className="text-xs sm:text-sm text-gold mb-1 font-semibold">
          👤 {user?.name || "Unknown User"}
        </p>

        {/* Portfolio Name */}
        <h2 className="text-lg sm:text-xl font-bold mb-2 truncate">
          {portfolio.name}
        </h2>

        {/* Stats */}
        <div className="space-y-1 text-sm sm:text-base">
          <p className="opacity-80">📦 Holdings: {portfolio?.holdings?.length}</p>
          <p className="opacity-80">💰 Invested: ${portfolio?.investedAmount?.toFixed(2)}</p>
          <p className="opacity-80">📈 Current Value: ${portfolio?.marketValue?.toFixed(2)}</p>
          <p
            className={`font-semibold ${
              portfolio.unrealizedProfitLoss >= 0
                ? "text-positive"
                : "text-negative"
            }`}
          >
            {portfolio.unrealizedProfitLoss >= 0 ? "▲" : "▼"} P/L: $
            {portfolio?.profitLoss?.toFixed(2)}
          </p>
        </div>

        {/* Gradient Overlay Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br 
                        from-transparent via-transparent 
                        to-gold/10 dark:to-brightGold/10 
                        opacity-0 hover:opacity-100 
                        transition-opacity duration-300">
        </div>
      </div>

      {/* Add Holding Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click navigation
          onAddHolding(portfolio._id);
        }}
        className="absolute top-2 right-2 px-3 py-1 bg-gold text-background rounded-lg text-sm font-semibold hover:bg-brightGold transition"
      >
        + Add Holding
      </button>
    </div>
  );
}
