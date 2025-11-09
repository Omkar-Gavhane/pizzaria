import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientCard from "./IngredientCard";
import { useNavigate } from "react-router-dom";

const BuildPizza = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dough, setDough] = useState(doughOptions[0]);
  const [sauce, setSauce] = useState(sauceOptions[0]);
  const [spread, setSpread] = useState(spreadOptions[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/ingredients");
        setIngredients(res.data);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    const ingredientsTotal = selectedIngredients.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const baseTotal = dough.price + sauce.price + spread.price;
    setTotalPrice(ingredientsTotal + baseTotal);
  }, [selectedIngredients, dough, sauce, spread]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const customPizza = {
        name: "Custom Pizza",
        description: "A pizza crafted with your favorite ingredients.",
        type: selectedIngredients.some(
          (i) => i.tname === "Chicken" || i.tname === "Pepperoni"
        )
          ? "nonveg"
          : "veg",
        ingredients: [dough.name, sauce.name, spread.name],
        topping: selectedIngredients.map((i) => i.tname),
        price: totalPrice,
        image:
          "https://www.shutterstock.com/shutterstock/photos/2540737987/display_1500/stock-photo-cheesy-hot-and-freshly-baked-pizzas-through-drool-worthy-visuals-and-close-ups-that-make-2540737987.jpg",
      };

      const res = await axios.post(
        "http://localhost:7000/api/cart/pizzas/add",
        { pizzaData: customPizza },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Added custom pizza:", res.data);
      alert("Your custom pizza has been added to the cart!");
    } catch (err) {
      console.error("❌ Error adding custom pizza:", err);
    }
  };

  return (
    <div className="container my-5 d-flex flex-column">
      <h2 className="fw-bold text-center text-warning mb-4">
        🍕 Build Your Own Pizza
      </h2>
      <p className="text-center text-secondary w-75 mx-auto">
        Choose your base, sauce, cheese, and toppings to craft your perfect
        pizza!
      </p>

      {/* Base Options */}
      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <label className="fw-bold mb-2">Dough:</label>
          <select
            className="form-select"
            value={dough.name}
            onChange={(e) => {
              const selected = doughOptions.find(
                (d) => d.name === e.target.value
              );
              setDough(selected);
            }}
          >
            {doughOptions.map((d) => (
              <option key={d.name}>{`${d.name} (+₹${d.price})`}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="fw-bold mb-2">Sauce:</label>
          <select
            className="form-select"
            value={sauce.name}
            onChange={(e) => {
              const selected = sauceOptions.find(
                (s) => s.name === e.target.value
              );
              setSauce(selected);
            }}
          >
            {sauceOptions.map((s) => (
              <option key={s.name}>{`${s.name} (+₹${s.price})`}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="fw-bold mb-2">Cheese:</label>
          <select
            className="form-select"
            value={spread.name}
            onChange={(e) => {
              const selected = spreadOptions.find(
                (sp) => sp.name === e.target.value
              );
              setSpread(selected);
            }}
          >
            {spreadOptions.map((sp) => (
              <option key={sp.name}>{`${sp.name} (+₹${sp.price})`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="mt-5">
        <h4 className="text-center mb-3">🧀 Choose Additional Ingredients</h4>
        <div className="row g-3 d-flex px-auto align-items-center justify-content-center mx-auto w-100">
          {ingredients.map((i) => (
            <div key={i._id} className="col-12 col-sm-12 col-md-12 col-lg-12 d-flex   align-items-center justify-content-center">
              <IngredientCard
                ingredient={i}
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Total Section */}
      <div className="text-center mt-5">
        <h5 className="fw-bold mb-3">Total: ₹ {totalPrice}</h5>
        <button
          className="btn btn-warning text-white px-4 py-2"
          onClick={handleAddToCart}
          disabled={selectedIngredients.length === 0}
        >
          Add Custom Pizza to Cart
        </button>
      </div>
    </div>
  );
};

const doughOptions = [
  { name: "Normal Pizza Dough", price: 50 },
  { name: "Whole Wheat Dough", price: 60 },
  { name: "Low Carb Dough", price: 70 },
];

const sauceOptions = [
  { name: "Classic Tomato Sauce", price: 30 },
  { name: "Barbeque Sauce", price: 40 },
  { name: "White Garlic Sauce", price: 50 },
];

const spreadOptions = [
  { name: "Mozzarella Cheese", price: 40 },
  { name: "Cheddar Cheese", price: 50 },
  { name: "Vegan Cheese", price: 60 },
];

export default BuildPizza;
