require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express(); // ✅ MUST come before app.use()

// ================== middleware ==================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ================== view engine ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================== static files ==================
app.use(express.static(path.join(__dirname, "public")));

// ================== routes ==================
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.redirect("/products");
});

// ================== start server ==================
console.log("=== APP STARTING ===");

const PORT = 3000;

console.log("About to listen on port:", PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server is listening on port", PORT);
});
