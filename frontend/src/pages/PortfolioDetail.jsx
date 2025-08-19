import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as echarts from "echarts";
import HoldingCard from "../components/HoldingCard";
import PieChart from '../components/PortfolioOfUser/PieChart'
import PortfolioChart from "../components/PortfolioOfUser/TransactionChart";
import { AuthContext } from "../context/AuthContext";
import { PortfolioContext } from "../context/PortfolioContext";

export default function PortfolioDetail() {
  const { selectedPortfolioId } = useContext(PortfolioContext);
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const portfolioId = selectedPortfolioId || id;

  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URL;

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch portfolio + holdings
  useEffect(() => {
    if (!portfolioId) return;

    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(
          `${API}/portfolio/portfolio-by-id/${portfolioId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPortfolio(res.data);
        setHoldings(res.data.holdings || []);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
      }
    };

    fetchPortfolio();
  }, [portfolioId, API, token]);

  // Fetch transactions
  useEffect(() => {
    if (!portfolioId) return;

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${API}/portfolio/transaction/portfolio/${portfolioId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, [portfolioId, API, token]);

  

  if (!portfolio) {
    return (
      <p className="p-6 text-center text-gray-500 dark:text-textLight">
        Loading portfolio...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background text-black dark:text-textLight transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Portfolio Name */}
        <h2 className="text-3xl font-extrabold text-gold dark:text-brightGold text-center drop-shadow-gold">
          {portfolio.name}
        </h2>

        {/* Chart */}
   
   <div className="bg-white dark:bg-surface p-6 rounded-2xl shadow-md dark:shadow-gold transition duration-400">
          <PortfolioChart id={portfolioId} theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} />
        </div>

        {/* Chart */}


   {/* Pie Chart */}
        <div className="bg-white dark:bg-surface p-6 rounded-2xl shadow-md dark:shadow-gold transition duration-400">
          <PieChart holdings={portfolio.holdings} theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} />
        </div>


        {/* Holdings */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gold dark:text-brightGold">
            Holdings
          </h3>
          {holdings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {holdings.map((h) => (
                <HoldingCard key={h._id} holding={h} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-textLight">
              No holdings in this portfolio yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
