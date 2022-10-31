const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // quote: {
    //   type: String,
    // },
    fridge: [
      {
        ingredient: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        Date: { type: Date, required: true },
      },
    ],
    pantry: [
      {
        ingredient: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        Date: { type: Date, required: true },
      },
    ],
  },
  { collection: "users" }
);

const model = mongoose.model("users", User);

module.exports = model;
