const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  reflection: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // to link to logged-in user
});

module.exports = mongoose.model("Reflection", reflectionSchema);
