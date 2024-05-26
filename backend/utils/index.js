import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const checkEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user && user !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};

export const checkUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username }).exec();
    if (user && user !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
};

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.status(401).send({ message: "Token Expired" });
          } else {
            console.error("Token verification failed:", err);
            res.status(401).send({ message: "Invalid Token" });
          }
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Access Denied: Admins Only" });
  }
};
