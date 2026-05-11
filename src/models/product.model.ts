import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    comparePrice: {
      type: Number,
      default: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["draft", "active"],
      default: "active",
    },

    variants: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  models.Product || model("Product", ProductSchema);
