import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Transactions() {
  const { user, token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
       

        const res = await axios.get(`${API}/portfolio/transaction/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background transition-colors duration-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gold">
          📑 Transactions
        </h2>

        {/* Table Card */}
        <div className="bg-white dark:bg-surface rounded-2xl shadow-md dark:shadow-gold overflow-hidden transition duration-400">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-background text-gray-900 dark:text-brightGold text-lg">
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Shares</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <tr
                      key={t._id}
                      className="hover:bg-gray-100 dark:hover:bg-background hover:shadow-gold-sm transition duration-300"
                    >
                      <td className="py-3 px-4 text-gray-800 dark:text-textLight font-medium">
                        {t.ticker}
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          t.type.toLowerCase() === "buy" ? "text-positive" : "text-negative"
                        }`}
                      >
                        {t.type}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-textLight">{t.qty}</td>
                      <td className="py-3 px-4 text-gray-800 dark:text-textLight">
                        ${t.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-textLight">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-600 dark:text-textLight"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
