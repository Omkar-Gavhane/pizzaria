import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import Pizza from "./models/Pizza.js";
import Ingredients from "./models/Ingredients.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    // console.log(pizzas.map((pizza)=>console.log(pizza.name)));

    res.status(200).json(pizzas);
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredients.find({});
    res.status(200).json(ingredients);
  } catch (error) {
    res.send(error);
  }
});

// Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
