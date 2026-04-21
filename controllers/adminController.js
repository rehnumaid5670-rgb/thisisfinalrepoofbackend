const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER ADMIN (optional)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json(admin);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔐 ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      "library_secret_key",
      { expiresIn: "1d" }
    );

    res.json({ success: true, token, admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📊 DASHBOARD STATS
const getAdminStats = async (req, res) => {
  try {
    const stats = {
      totalBooks: 120,
      totalUsers: 45,
      issuedBooks: 15
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ EXPORT ALL FUNCTIONS
module.exports = {
  registerAdmin,
  adminLogin,
  getAdminStats
};