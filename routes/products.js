import { Router } from "express";
import Product from "../models/Product.js";
import { checkExistToken } from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Boom | Shop",
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products",
    isProductsPage: true,
  });
});

router.get("/add", checkExistToken, (req, res) => {
  res.render("add", {
    title: "Add Product",
    isAddPage: true,
    addProductError: req.flash("addProductError"),
  });
});

router.post("/add-products", userMiddleware, async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("addProductError", "All fields are required");
    res.redirect("/add");
    return;
  }
  await Product.create({...req.body, user: req.userId})
  res.redirect("/");
});

export default router;
