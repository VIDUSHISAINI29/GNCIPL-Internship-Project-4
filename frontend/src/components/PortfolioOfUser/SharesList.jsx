import React from "react";

export default function SharesList({ shares }) {
  return (
    <div className="mt-6 bg-white dark:bg-surface p-6 rounded-2xl shadow-gold transition duration-400">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gold tracking-wide border-b border-gold pb-2">
        📊 Shares Overview
      </h2>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-800 dark:text-brightGold text-lg">
            <th className="border-b border-gold p-3">Ticker</th>
            <th className="border-b border-gold p-3">Quantity</th>
            <th className="border-b border-gold p-3">Unit Price</th>
            <th className="border-b border-gold p-3">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {shares.map((share) => {
            const total = share.avgBuyPrice * share.qty;
            const isProfit = total >= 1000; // demo rule

            return (
              <tr
                key={share.ticker}
                className="hover:bg-gray-100 dark:hover:bg-background hover:shadow-gold-sm transform hover:scale-[1.01] transition duration-400"
              >
                <td className="p-3 text-gray-800 dark:text-textLight font-medium">
                  {share.ticker}
                </td>
                <td className="p-3 text-gray-800 dark:text-textLight">
                  {share.qty}
                </td>
                <td className="p-3 text-gray-800 dark:text-textLight">
                  ${share.avgBuyPrice}
                </td>
                <td
                  className={`p-3 font-semibold ${
                    isProfit ? "text-positive" : "text-negative"
                  }`}
                >
                  ${total.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
