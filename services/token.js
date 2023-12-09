import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const accessToken = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return accessToken;
};

export { generateToken };
