import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res, next) {
  if (!req.cookies.token) {
    // res.redirect("/login");
    next()
    return;
  }

  const token = req.cookies.token;
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decodeToken.userID);
  req.userId = user._id
  next();
}
