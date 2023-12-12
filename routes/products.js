import { Router } from "express";
import Product from "../models/Product.js";
import { checkExistToken } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().lean();

  res.render("index", {
    title: "Boom | Shop",
    products: products.reverse(),
    userId: req.userId ? req.userId.toString() : null,
  });
});

router.get("/products", async (req, res) => {
  const user = req.userId ? req.userId.toString() : null;
  const myProducts = await Product.find({ user }).populate("user").lean();

  res.render("products", {
    title: "Products",
    isProductsPage: true,
    myProducts,
  });
});

router.get("/add", checkExistToken, (req, res) => {
  res.render("add", {
    title: "Add Product",
    isAddPage: true,
    addProductError: req.flash("addProductError"),
  });
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("user").lean();
  res.render("product", {
    product,
  });
});

router.post("/add-products", async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("addProductError", "All fields are required");
    res.redirect("/add");
    return;
  }
  await Product.create({ ...req.body, user: req.userId });
  res.redirect("/");
});

export default router;
