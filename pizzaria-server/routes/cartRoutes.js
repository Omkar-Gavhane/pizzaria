import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Cart from "../models/Cart.js";
import Pizza from "../models/Pizza.js";
import mongoose from "mongoose";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🔹 Middleware: Verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains user.id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// 🔹 GET all pizzas in the user's cart
router.get("/pizzas", verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id });

    // Populate only normal pizzas (that have ObjectId)
    const populatedItems = await Promise.all(
      cartItems.map(async (item) => {
        if (typeof item.pizza === "object" && !item.pizza._id) {
          // custom pizza stored directly
          return item;
        } else {
          // populate normal pizza
          const pizzaData = await Pizza.findById(item.pizza);
          return {
            ...item.toObject(),
            pizza: pizzaData || item.pizza,
          };
        }
      })
    );

    res.json(populatedItems);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ message: "Server error fetching cart" });
  }
});

// 🔹 ADD pizza to cart (normal OR custom)
router.post("/pizzas/add", verifyToken, async (req, res) => {
  try {
    const { pizzaId, pizzaData, quantity } = req.body;
    let pizzaInfo = null;

    // Case 1️⃣ — Normal Pizza (from DB)
    if (pizzaId) {
      const pizza = await Pizza.findById(pizzaId);
      if (!pizza) return res.status(404).json({ message: "Pizza not found" });

      pizzaInfo = {
        _id: pizza._id,
        name: pizza.name,
        type: pizza.type,
        price: pizza.price,
        description: pizza.description,
        image: pizza.image,
        ingredients: pizza.ingredients,
        topping: pizza.topping,
        isCustom: false,
      };
    }

    // Case 2️⃣ — Custom Pizza (not saved to DB)
    else if (pizzaData) {
      const { name, type, price, description, image, ingredients, topping } =
        pizzaData;

      pizzaInfo = {
        name,
        type,
        price,
        description,
        image,
        ingredients,
        topping,
        isCustom: true,
      };
    } else {
      return res.status(400).json({ message: "Invalid pizza data" });
    }

    // 🔸 Add or update cart item
    let cartItem = null;

    // Only merge if same normal pizza exists
    if (pizzaInfo._id) {
      cartItem = await Cart.findOne({
        user: req.user.id,
        "pizza._id": pizzaInfo._id,
      });
    }

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        user: req.user.id,
        pizza: pizzaInfo,
        quantity: quantity || 1,
      });
      await cartItem.save();
    }

    res.status(201).json({ message: "Pizza added to cart", cartItem });
  } catch (err) {
    console.error("❌ Error adding pizza:", err);
    res.status(500).json({ message: "Server error adding pizza" });
  }
});

// 🔹 UPDATE pizza quantity
router.patch("/pizzas/updateQuantity/custom", verifyToken, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const cartItem = await Cart.findOne({
      user: req.user.id,
      "pizza.isCustom": true,
      "pizza.name": name,
    });
    if (!cartItem)
      return res
        .status(404)
        .json({ message: "Custom pizza not found in cart" });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: "Custom pizza quantity updated", cartItem });
  } catch (err) {
    console.error("❌ Error updating custom pizza:", err);
    res.status(500).json({ message: "Server error updating custom pizza" });
  }
});

router.patch(
  "/pizzas/updateQuantity/:pizzaId",
  verifyToken,
  async (req, res) => {
    try {
      const { pizzaId } = req.params;
      const { quantity } = req.body;

      // Always search by embedded field
      const cartItem = await Cart.findOne({
        user: req.user.id,
        "pizza._id": new mongoose.Types.ObjectId(pizzaId),
      });

      if (!cartItem)
        return res.status(404).json({ message: "Pizza not found in cart" });

      // Update quantity safely
      cartItem.quantity = Math.max(1, quantity);
      await cartItem.save();

      res.json({ message: "Quantity updated", cartItem });
    } catch (err) {
      console.error("❌ Error updating quantity:", err);
      res.status(500).json({ message: "Server error updating quantity" });
    }
  }
);


router.delete("/pizzas/remove/custom", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const deleted = await Cart.findOneAndDelete({
      user: req.user.id,
      "pizza.isCustom": true,
      "pizza.name": name,
    });
    if (!deleted)
      return res.status(404).json({ message: "Custom pizza not found" });

    res.json({ message: "Custom pizza removed" });
  } catch (err) {
    console.error("❌ Error removing custom pizza:", err);
    res.status(500).json({ message: "Server error removing custom pizza" });
  }
});

router.patch(
  "/pizzas/updateQuantity/:pizzaId",
  verifyToken,
  async (req, res) => {
    try {
      const { pizzaId } = req.params;
      const { quantity } = req.body;

      let cartItem;

      // Normal pizza stored as embedded object with _id
      cartItem = await Cart.findOne({
        user: req.user.id,
        "pizza._id": pizzaId,
      });

      if (!cartItem)
        return res.status(404).json({ message: "Pizza not found in cart" });

      cartItem.quantity = Math.max(1, quantity);
      await cartItem.save();

      res.json({ message: "Quantity updated", cartItem });
    } catch (err) {
      console.error("❌ Error updating quantity:", err);
      res.status(500).json({ message: "Server error updating quantity" });
    }
  }
);

// 🔹 CLEAR user's entire cart
router.delete("/pizzas/clear", verifyToken, async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("❌ Error clearing cart:", err);
    res.status(500).json({ message: "Server error clearing cart" });
  }
});

export default router;
