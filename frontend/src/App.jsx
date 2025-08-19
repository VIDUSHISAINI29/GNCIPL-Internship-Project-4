import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PortfolioDetail from "./pages/PortfolioDetail";
import Transactions from "./pages/Transactions";
import UserPortfolio from "./pages/PortfolioPage";
import AdminOnlyPage from "./pages/AdminsOnlyPage";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProfilePage from './pages/ProfilePage'
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user.role === 'admin' ? children : <Navigate to="/admins-only"  />;
}
// function UserRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   return user.role === 'admin' ? children :'Only for Admins' ;
// }

export default function App() {
  return (
    <Router>
      <Navbar/>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><AdminRoute><Dashboard /></AdminRoute> </PrivateRoute> } />
        <Route path="/portfolio/:id" element={<PrivateRoute><PortfolioDetail /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><UserPortfolio /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/admins-only" element={<PrivateRoute><AdminOnlyPage /></PrivateRoute>} />
      </Routes>
      <Footer/>
    </Router>
  );
}
