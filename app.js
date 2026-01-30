require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express();   // ✅ MUST be here, before app.use()

// ---------- middleware ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ---------- view engine ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- static ----------
app.use(express.static(path.join(__dirname, "public")));

// ---------- routes ----------
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.redirect("/products");
});

// ---------- start server ----------
console.log("=== APP STARTING ===");

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server listening on port", PORT);
});
