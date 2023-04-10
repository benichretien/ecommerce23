import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [{ type: ObjectId, ref: "Product" }],
    payment: {},
    buyer: { type: ObjectId, ref: "User" },
    status: {
      type: String,
      default: "Non traité",
      enum: [
        "Non traité",
        "En traitement",
        "Expédié",
        "Délivré",
        "Annulé",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);