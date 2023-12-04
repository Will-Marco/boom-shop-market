import { Router } from "express";

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

export default router;
