const express = require("express");
const router = express.Router();
const Reflection = require("../model/Reflection");

// POST reflection
router.post("/", async (req, res) => {
  try {
    const { date, reflection } = req.body;

    if (!date || !reflection) {
      return res
        .status(400)
        .json({ message: "Date and reflection are required." });
    }

    const newReflection = new Reflection({ date, reflection });
    await newReflection.save();

    res.status(200).json({ message: "Reflection saved successfully!" });
  } catch (error) {
    console.error("Error saving reflection:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
