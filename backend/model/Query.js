const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    query: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//Compile to form the model
module.exports = mongoose.model("Query", userSchema);
