const express = require("express");
const router = express.Router();

const { applyCard } = require("../controllers/cardController");

router.post("/apply-card", applyCard);

module.exports = router;