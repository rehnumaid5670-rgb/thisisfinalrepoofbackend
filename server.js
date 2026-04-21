const dns  = require("dns");
dns.setServers(["8.8.8.8","8.8.4.4"]);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes.js");
const cardRoutes = require("./routes/CardRoutes.js");
const loginRoutes = require("./routes/loginRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js");
// const returnRoutes = require("./routes/returnRoutes");
const ebookRoutes = require("./routes/ebookRoutes");
const usingRoutes = require("./routes/usingRoutes")
const catalogueRoutes = require("./routes/catalogueRoutes");
const spaceRoutes = require("./routes/spaceRoutes");
// const coursesRoutes = require("./routes/coursesRoutes");
connectDB();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/libraryDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));


app.post("/api/getcard", (req, res) => {
  const { name, email, phone, address, idproof } = req.body;

  console.log("Library Card Request:", req.body);

  res.json({
    success: true,
    message: "Library Card Request Submitted Successfully",
    data: {
      name,
      email,
      phone,
      address,
      idproof,
    },
  });
});


// Auth & User Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/adminpanel", adminRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/feedback", feedbackRoutes);
// app.use("/api/return", returnRoutes);
app.use("/api/ebook", ebookRoutes);
app.use("/api/media", catalogueRoutes);
app.use("/api/library", usingRoutes);
app.use("/api/space", spaceRoutes);
// app.use("/api/courses", coursesRoutes);
// ================= Admin Login =================
const admin = {
  email: "admin@gmail.com",
  password: "1234",
};

app.post("/api/adminpanel/login", (req, res) => {
  const { email, password } = req.body;

  if (email === admin.email && password === admin.password) {
    const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      token,
    });
  } else {
    res.json({
      success: false,
      message: "Invalid Credentials",
    });
  }
});


// ================= Book Add API =================
// app.post("/api/books/add", (req, res) => {
//   const { title, author, category, quantity } = req.body;

//   if (!title || !author || !category || !quantity) {
//     return res.json({
//       success: false,
//       message: "All fields required",
//     });
//   }

//   console.log("New Book:", req.body);

//   res.json({
//     success: true,
//     message: "Book added successfully",
//   });
// });


// ================= Default Route =================
app.get("/", (req, res) => {
  res.send("Library API Running");
});
app.get("/api/adminpanel/dashboard", (req, res) => {
  res.json({
    stats: {},
    books: [],
    users: [],
    requests: [],
    feedback: []
  });
});

// ================= Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});