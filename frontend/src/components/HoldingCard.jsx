import React from "react";

export default function HoldingCard({ holding }) {
  const totalValue = holding.qty * holding.avgBuyPrice;

  return (
    <div className="bg-white hover:cursor-pointer dark:bg-surface border border-gray-200 dark:border-gray-700 rounded-2xl shadow-gold-sm hover:shadow-gold transition duration-400 transform hover:-translate-y-1 p-6">
      {/* Stock Symbol */}
      <h4 className="text-xl font-bold mb-3 text-gold dark:text-brightGold">
        {holding.stockSymbol || holding.ticker}
      </h4>

      {/* Stats */}
      <div className="space-y-1 text-black dark:text-textLight">
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">
            Shares:
          </span>{" "}
          {holding.qty}
        </p>
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">
            Avg Buy Price:
          </span>{" "}
          ₹{holding.avgBuyPrice.toFixed(2)}
        </p>
        <p className="text-lg font-semibold">
          <span className="text-gray-600 dark:text-gray-400">Total Value:</span>{" "}
          <span className="text-gold dark:text-brightGold">
            ₹{totalValue.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Divider + Lots */}
      {holding.lots?.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-sm text-gold dark:text-brightGold mb-2">
            Lots (FIFO):
          </p>
          <div className="space-y-1 text-sm text-black dark:text-textLight">
            {holding.lots.map((lot, idx) => (
              <p key={idx}>
                {lot.qty} × ₹{lot.price.toFixed(2)} on{" "}
                {new Date(lot.date).toLocaleDateString()}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
