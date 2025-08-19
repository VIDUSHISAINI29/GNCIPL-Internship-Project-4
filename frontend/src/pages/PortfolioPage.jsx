import React, { useEffect, useState, useContext } from "react";
import UserPortfolioCard from "../components/PortfolioOfUser/UserPortfolioCard";
import PortfolioCard from "../components/PortfolioCard";
import SharesList from "../components/PortfolioOfUser/SharesList";
import PieChart from "../components/PortfolioOfUser/PieChart";
import { AuthContext } from "../context/AuthContext";
import PortfolioChart from '../components/PortfolioOfUser/TransactionChart'
import Dashboard from '../pages/Dashboard';
import CreatePortfolioForm from "../components/PostComponents/CreatePortfolioForm";
import HoldingFormModal from '../components/PostComponents/CreateHoldingForm'
import axios from "axios";

export default function UserPortfolio() {
  const { user, token } = useContext(AuthContext);
  const [portfolio, setPortfolio] = useState(null);
  const [totals, setTotals] = useState(null);
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const [allPortfolios, setAllPortfolios] = useState([]);
    const [holdingModalOpen, setHoldingModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL;
   const fetchPortfolio = async () => {
        try {
          const res = await axios.get(`${API}/portfolio/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 attach token here
            },
          });
          setAllPortfolios(res.data.portfolios)
          setTotals(res.data.totals);
          console.log("portfolio = ", res.data.portfolios);
          console.log("inv amt = ", res.data.totals.investedAmount);
        } catch (err) {
          console.error("Error fetching portfolios:", err);
        }
      };
  useEffect(() => {
    if (user) {
   
      fetchPortfolio();
    }
  }, [user]);

  if (!totals)
    return (
      <div className="flex items-center justify-center h-screen text-gold text-xl">
        Loading portfolio...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background transition-colors duration-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gold">

        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UserPortfolioCard title="Total Invested" value={`$${totals.investedAmount}`} />
          <UserPortfolioCard title="Current Value" value={`$${totals.marketValue}`} />
          <UserPortfolioCard
            title="Profit / Loss"
            value={`$${totals.profitLoss} (${totals.profitLossPercentage}%)`}
            isProfit={totals.profitLoss >= 0}
          />
        </div>



     


          {/* All portfolio card for the particular user  */}

        <div className="min-h-screen bg-gray-100 dark:bg-background transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-textLight">All Portfolios</h1>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-gold text-background font-semibold hover:bg-brightGold transition"
                >
                  + Create Portfolio
                </button>
              </div>
      
              {allPortfolios.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center mt-12">
                  No portfolios found. Create one to get started!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPortfolios.map((p) => (
                    <PortfolioCard
                      key={p._id}
                      portfolio={p}
                      onAddHolding={(id) => {
                        setSelectedPortfolioId(id);
                        setHoldingModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
      
            <CreatePortfolioForm
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onPortfolioCreated={(newPortfolio) => setAllPortfolios([ ...allPortfolios, newPortfolio,])}
            />
      
            <HoldingFormModal
              isOpen={holdingModalOpen}
              onClose={() => setHoldingModalOpen(false)}
              portfolioId={selectedPortfolioId}
              token={token}
              onHoldingAdded={fetchPortfolio}
            />
          </div>

        {/* Shares List */}
        {/* <SharesList shares={portfolio.holdings} /> */}
      </div>
    </div>
  );
}
