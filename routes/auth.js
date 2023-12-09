import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../services/token.js";

const router = Router();

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    title: "Login",
    isLoginPage: true,
    loginError: req.flash("loginError"),
  });
});

router.get("/register", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }

  res.render("register", {
    title: "Registerations",
    isRegisterPage: true,
    registerError: req.flash("registerError"),
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    res.redirect("/login");
    return;
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    req.flash("loginError", "User not found!");
    res.redirect("/login");
    return;
  }

  const isPasswordEqual = await bcrypt.compare(password, existUser.password);
  if (!isPasswordEqual) {
    req.flash("loginError", "Password wrong!");
    res.redirect("/login");
    return;
  }

  const token = generateToken(existUser._id);
  res.cookie("token", token, { httpOnly: true, secure: true });
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    req.flash("registerError", "All fields are required");
    res.redirect("/register");
    return;
  }

  const candidate = await User.findOne({ email });
  if (candidate) {
    req.flash("registerError", "User already exist!");
    res.redirect("/register");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { firstname, lastname, email, password: hashedPassword };
  const user = await User.create(userData);
  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true, secure: true });
  res.redirect("/");
});

export default router;
