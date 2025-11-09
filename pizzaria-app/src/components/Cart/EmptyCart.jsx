import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h2>Your cart is empty 🍕</h2>
      <p className="text-muted mb-4">Add some delicious pizzas to your cart!</p>
      <button
        className="btn btn-warning fw-bold"
        onClick={() => navigate("/orderpizza")}
      >
        Add Pizzas
      </button>
    </div>
  );
};

export default EmptyCart;
