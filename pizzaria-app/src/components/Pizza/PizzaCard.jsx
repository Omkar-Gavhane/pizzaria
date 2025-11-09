import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Quantity from "../Quantity";

const PizzaCard = ({ pizza }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // ✅ Helper — Get Auth Header
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // ✅ Check if user logged in
  const isLoggedIn = () => !!localStorage.getItem("token");

  // ✅ Check if pizza already in user's cart
  useEffect(() => {
    const checkPizzaInCart = async () => {
      if (!isLoggedIn()) {
        setIsLoading(false);
        return;
      }

      try {
        const config = getAuthHeader();
        const res = await axios.get(
          "http://localhost:7000/api/cart/pizzas",
          config
        );

        const found = res.data.find((item) => item.pizza._id === pizza._id);

        if (found) {
          setInCart(true);
          setQuantity(found.quantity || 1);
        } else {
          setInCart(false);
          setQuantity(1);
        }
      } catch (err) {
        console.error("Error checking pizza in cart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkPizzaInCart();
  }, [pizza._id]);

  // ✅ Add to cart
  const handleAddCart = async (id) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      const config = getAuthHeader();
      const res = await axios.post(
        "http://localhost:7000/api/cart/pizzas/add",
        { pizzaId: id },
        config
      );
      setInCart(true);
      setQuantity(1);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  // ✅ Update quantity (only if in cart)
  useEffect(() => {
    if (!inCart || !pizza?._id || !isLoggedIn()) return;

    const updateQuantity = async () => {
      try {
        const config = getAuthHeader();
        await axios.patch(
          `http://localhost:7000/api/cart/pizzas/updateQuantity/${pizza._id}`,
          { quantity },
          config
        );
        console.log(`✅ Updated ${pizza.name} quantity → ${quantity}`);
      } catch (err) {
        console.error("❌ Quantity update failed:", err);
      }
    };

    updateQuantity();
  }, [quantity, inCart, pizza._id]);

  // ✅ Loading UI
  if (isLoading) {
    return (
      <div className="card text-center shadow-sm p-4 mb-3">
        <p>Loading...</p>
      </div>
    );
  }

  // ✅ Main Card UI
  return (
    <div className="card shadow-sm mb-4 h-100">
      <div className="d-flex px-2 row g-0 align-items-center justify-content-between overflow-hidden">
        {/* LEFT SECTION */}
        <div className="col-md-3 d-flex flex-column align-items-center p-3">
          <h5 className="fw-bold text-center">{pizza.name}</h5>
          <div
            className="rounded-circle mt-2"
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: pizza.type === "veg" ? "green" : "red",
            }}
          ></div>
          <h6 className="mt-3 text-warning">
            ₹ {Number(pizza.price).toFixed(2)}
          </h6>
        </div>

        {/* MIDDLE SECTION */}
        <div className="col-md-6 p-3 text-start">
          <p className="mb-1">{pizza.description}</p>
          <p className="mb-1">
            <strong>Ingredients:</strong> {pizza.ingredients.join(", ")}
          </p>
          <p className="mb-0">
            <strong>Toppings:</strong> {pizza.topping.join(", ")}
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-3 text-center p-3 d-flex flex-column align-items-center">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="img-fluid rounded mb-3"
            style={{ maxWidth: "150px", height: "auto" }}
          />
          {inCart ? (
            <Quantity quantity={quantity} setQuantity={setQuantity} />
          ) : (
            <button
              className="btn btn-warning text-white fw-bold"
              onClick={() => handleAddCart(pizza._id)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Responsive behavior for small devices */}
      <style>{`
        @media (max-width: 768px) {
          .row.g-0 {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default PizzaCard;
