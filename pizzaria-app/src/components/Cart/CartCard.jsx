import React, { useState, useEffect } from "react";
import axios from "axios";
import Quantity from "../Quantity";

const CartCard = ({ pizza, pizzaQuantity, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(pizzaQuantity);
  const [price, setPrice] = useState(pizza.price);
  const token = localStorage.getItem("token");

  const handleRemove = async () => {
    try {
      if (pizza.isCustom) {
        // Custom pizza: remove using a body payload (no _id)
        await axios.delete(
          "http://localhost:7000/api/cart/pizzas/remove/custom",
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { name: pizza.name }, // or any identifier
          }
        );
        onRemove(pizza.name);
      } else {
        // Normal pizza: remove using _id in params
        await axios.delete(
          `http://localhost:7000/api/cart/pizzas/remove/${pizza._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onRemove(pizza._id);
      }
    } catch (err) {
      console.log("❌ Failed to remove item:", err);
    }
  };

  useEffect(() => {
    if (!pizza) return;
    setPrice(pizza.price * quantity);

    const updateQuantity = async () => {
      try {
        if (pizza.isCustom) {
          await axios.patch(
            "http://localhost:7000/api/cart/pizzas/updateQuantity/custom",
            { name: pizza.name, quantity, isCustom: true },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else if (pizza._id) {
          console.log(pizza);
          
          await axios.patch(
            `http://localhost:7000/api/cart/pizzas/updateQuantity/${pizza._id}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (err) {
        console.log("❌ Failed to update quantity:", err);
      }
    };

    updateQuantity();
    onQuantityChange(pizza._id, quantity, pizza.isCustom);
  }, [quantity]);

  return (
    <div
      className="col-12 border p-3 mt-2 d-flex justify-content-between align-items-center"
      style={{ borderRadius: "10px", height: "150px", overflow: "hidden" }}
    >
      <div className="d-flex gap-4">
        <img
          src={pizza.image}
          alt={pizza.name}
          style={{ width: "130px", borderRadius: "10px" }}
        />
        <div className="d-flex flex-column justify-content-evenly">
          <h5>{pizza.name}</h5>
          <button
            className="btn btn-danger mt-2"
            style={{ width: "130px" }}
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-5">
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <h6 className="my-auto">&#8377; {price.toFixed(2)}</h6>
      </div>
    </div>
  );
};

export default CartCard;
