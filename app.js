require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express();   // ← MUST be before app.use()

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

// home redirect (optional)
app.get("/", (req, res) => {
  res.redirect("/products");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
