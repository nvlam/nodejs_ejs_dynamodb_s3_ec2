require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");

const productsRoutes = require("./routes/products");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // form data
app.use(methodOverride("_method"));              // PUT/DELETE via ?_method=
app.use(express.static("public"));

app.use("/", productsRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
