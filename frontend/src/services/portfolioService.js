import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserPortfolios = async () => {
  const res = await axios.get(`${API_URL}/api/`);
  return res.data;
};

export const getPortfolioById = async (portfolioId) => {
  const res = await axios.get(`${API_URL}/${portfolioId}`);
  return res.data;
};

export const createPortfolio = async (portfolioData) => {
  const res = await axios.post(`${API_URL}/create`, portfolioData);
  return res.data;
};
