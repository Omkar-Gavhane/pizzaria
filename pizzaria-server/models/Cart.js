import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pizza: {
    type: mongoose.Schema.Types.Mixed, // 👈 allows either ObjectId or object
    required: true,
  },
  quantity: { type: Number, min: 1, default: 1 },
});

export default mongoose.model("Cart", CartSchema);
