import express from "express";
import dotenv from "dotenv";
import { create } from "express-handlebars";
import AuthRoutes from "./routes/auth.js";
import ProductsRoutes from "./routes/products.js";

const app = express();
dotenv.config();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(AuthRoutes);
app.use(ProductsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server has been started on port " + port);
});
