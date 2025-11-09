import axios from "axios";
import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import CheckoutCard from "./CheckoutCard";
import EmptyCart from "./EmptyCart";

const CartPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = localStorage.getItem("token");  

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/cart/pizzas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPizzas(res.data);
        
      } catch (err) {
        console.log("Failed to fetch cart:", err);
      }
    };
    if (token) fetchCart();
  }, [token]);

  // ✅ Remove all pizzas
  const handleRemoveAll = async () => {
    try {
      await axios.delete("http://localhost:7000/api/cart//pizzas/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPizzas([]);
    } catch (err) {
      console.log("Failed to clear cart:", err);
    }
  };

  // ✅ Recalculate totals
  useEffect(() => {
    let items = 0;
    let price = 0;

    pizzas.forEach((p) => {
      items += p.quantity;
      price += p.quantity * p.pizza.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [pizzas]);

  return (
    <div className="d-flex flex-column vh-100">
      <h2 className="mb-5 text-center">My Cart</h2>

      {pizzas.length === 0 ? (
        <div className="container bg-dark text-white h-50 p-5 rounded rounded-4">
          <div className="d-flex justify-content-center align-items-center h-100">
            <EmptyCart />
          </div>
        </div>
      ) : (
        <div className="d-flex w-100">
          <div className="container">
            <div className="row">
              {pizzas.map((pizzaItem) => (
                <div key={pizzaItem._id}>
                  <CartCard
                    pizza={pizzaItem.pizza}
                    pizzaQuantity={pizzaItem.quantity}
                    onQuantityChange={(id, newQty) => {
                      setPizzas((prev) =>
                        prev.map((p) =>
                          p.pizza._id === id ? { ...p, quantity: newQty } : p
                        )
                      );
                    }}
                    onRemove={(id) => {
                      setPizzas((prev) =>
                        prev.filter((p) => p.pizza._id !== id)
                      );
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="p-4 mt-3">
              <button className="btn btn-danger px-4" onClick={handleRemoveAll}>
                Clear Cart
              </button>
            </div>
          </div>

          <div
            className="card w-50 align-self-start"
            style={{
              height: "450px",
              margin: "20px",
              marginTop: "90px",
              padding: "20px",
            }}
          >
            <CheckoutCard totalItems={totalItems} price={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
