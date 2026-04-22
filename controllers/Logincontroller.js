const User = require("../models/User"); // example import

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json(foundUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;