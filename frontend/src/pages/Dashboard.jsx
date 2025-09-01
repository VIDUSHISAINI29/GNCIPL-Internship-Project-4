import React, { useState, useContext, useEffect } from "react";
import PortfolioCard from "../components/DashboardPortfolioCard";
import CreatePortfolioForm from "../components/PostComponents/CreatePortfolioForm";
import HoldingFormModal from "../components/PostComponents/CreateHoldingForm";

import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const [holdingModalOpen, setHoldingModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const API = import.meta.env.VITE_BACKEND_URL;

  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API}/portfolio/portfolios-list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchPortfolios();
  }, [token, modalOpen, holdingModalOpen]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black dark:text-textLight">Your Portfolios</h1>
         
        </div>

        {portfolios.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-12">
            No portfolios found. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <PortfolioCard
                key={p._id}
                portfolio={p}
                portfolioUsername={p.user.name}
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
        onPortfolioCreated={(newPortfolio) => setPortfolios([newPortfolio, ...portfolios])}
      />

      <HoldingFormModal
        isOpen={holdingModalOpen}
        onClose={() => setHoldingModalOpen(false)}
        portfolioId={selectedPortfolioId}
        token={token}
        onHoldingAdded={fetchPortfolios}
      />
    </div>
  );
}
