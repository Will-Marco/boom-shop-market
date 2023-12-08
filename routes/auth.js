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

router.post("/login", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (!existUser) {
    console.log("User not found!");
    return;
  }

  const isPasswordEqual = await bcrypt.compare(
    req.body.password,
    existUser.password
  );
  if (!isPasswordEqual) {``
    console.log("Password wrong!");
    return;
  }

  console.log(existUser);
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
