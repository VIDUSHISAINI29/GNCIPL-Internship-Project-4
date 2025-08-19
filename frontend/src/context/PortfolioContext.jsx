import React, { createContext, useState } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);

  return (
    <PortfolioContext.Provider value={{ selectedPortfolioId, setSelectedPortfolioId }}>
      {children}
    </PortfolioContext.Provider>
  );
};
