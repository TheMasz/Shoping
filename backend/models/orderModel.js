import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const orderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", orderSchema);
