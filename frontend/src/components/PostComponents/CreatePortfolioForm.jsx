import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function CreatePortfolioForm({ isOpen, onClose, onPortfolioCreated }) {
  const { user, token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("INR");
  const [inventoryMethod, setInventoryMethod] = useState("FIFO");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${API}/portfolio/create-portfolio`,
        { name, baseCurrency, inventoryMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('crt prt', res.data)
      onPortfolioCreated(res.data.portfolio);
      setName("");
      setBaseCurrency("INR");
      setInventoryMethod("FIFO");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-colors">
      <div className="bg-white dark:bg-surface rounded-xl shadow-lg w-full max-w-md p-6 sm:p-8 transition-colors">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-textLight">
          Create Portfolio
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Portfolio Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Tech Portfolio"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-backgroundLight text-black dark:text-textLight focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Base Currency</label>
            <input
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-backgroundLight text-black dark:text-textLight focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
            >
            
            </input>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Inventory Method</label>
            <select
              value={inventoryMethod}
              onChange={(e) => setInventoryMethod(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-backgroundLight text-black dark:text-textLight focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
            >
              <option value="FIFO">FIFO</option>
              <option value="AVERAGE">AVERAGE</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-black dark:text-textLight hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gold text-background font-semibold hover:bg-brightGold transition"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
