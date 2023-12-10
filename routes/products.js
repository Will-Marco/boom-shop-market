import { Router } from "express";

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

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Add product",
    isAddPage: true,
  });
});

router.post("/add-products", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
