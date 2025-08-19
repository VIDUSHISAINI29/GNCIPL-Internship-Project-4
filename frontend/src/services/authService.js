import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  const token = res.data.token; // assuming your backend returns { token: "..." }

  // Example: Using token in another request
  const userData = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return userData.data;
};


export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  return res.data;
};
