const Card = require("../models/Card");

const applyCard = async (req, res) => {
  try {

    const { name, email, phone, address, idproof } = req.body;

    const existingUser = await Card.findOne({
      $or: [{ email }, { idproof }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already applied for a card"
      });
    }

    const count = await Card.countDocuments();

    const cardNumber = `LIB2026-${String(count + 1).padStart(4, "0")}`;

    const newCard = new Card({
      name,
      email,
      phone,
      address,
      idproof,
      cardNumber
    });

    await newCard.save();

    res.json({
      message: "Library card created successfully",
      cardNumber
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyCard };