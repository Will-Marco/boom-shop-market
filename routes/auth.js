import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isLoginPage: true,
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Registerations",
    isRegisterPage: true,
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { firstname, lastname, email, password: hashedPassword };
  const user = await User.create(userData);
  console.log(user);
  res.redirect("/");
});

export default router;
