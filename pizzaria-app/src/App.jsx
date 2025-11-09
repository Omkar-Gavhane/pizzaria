import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import OrderPizza from "./components/Pizza/OrderPizza";
import BuildPizza from "./components/BuildPizza/BuildPizza";
import Navbar from "./components/Base/Navbar";
import Home from "./components/Base/Home";
import CartPage from "./components/Cart/CartPage";
import Footer from "./components/Base/Footer";

// ✅ ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid d-flex flex-column min-vh-100 bg-light">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/orderpizza"
            element={
              <ProtectedRoute>
                <OrderPizza />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buildpizza"
            element={
              <ProtectedRoute>
                <BuildPizza />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
