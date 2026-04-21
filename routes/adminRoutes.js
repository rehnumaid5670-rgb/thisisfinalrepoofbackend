const express = require("express");
const { adminLogin, registerAdmin, getAdminStats } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.get("/stats", getAdminStats);

module.exports = router;