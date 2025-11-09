import React, { useEffect, useState } from "react";
import PizzaCard from "./PizzaCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/pizzas");
        setPizzas(res.data);
      } catch (err) {
        console.error("Error fetching pizzas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const handleProtectedAction = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to continue ordering.");
      navigate("/login");
      return false;
    }
    return true;
  };

  return (
    <div
      className="py-5 px-3 min-vh-100"
      style={{
        background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
      }}
    >
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-uppercase text-danger">
          🍕 Order Your Favorite Pizza
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : pizzas.length === 0 ? (
          <h5 className="text-center text-muted">
            No pizzas available right now. Please check back soon! 😋
          </h5>
        ) : (
          <div className="row g-4 justify-content-center">
            {pizzas.map((pizza) => (
              <div
                key={pizza._id}
                className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center"
              >
                <PizzaCard
                  pizza={pizza}
                  handleProtectedAction={handleProtectedAction}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPizza;
