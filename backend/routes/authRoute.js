import express from "express";
import { User } from "../models/userModel.js";
import { checkEmail, generateToken, isAuth } from "../utils/index.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email_username, password } = req.body;
    let user;
    if (!email_username || !password) {
      return res.status(400).json({
        message: "Fill all required fields: email, password.",
      });
    }
    if (email_username.includes("@")) {
      user = await User.findOne({ email: email_username }).exec();
    } else {
      user = await User.findOne({ username: email_username }).exec();
    }
    if (!user) {
      return res.status(404).json({ message: "Email or Username not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = generateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        tel: user.tel,
        address: user.address,
      });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, cf_password } = req.body;
    if (!email || !password || !cf_password) {
      return res.status(400).json({
        message: "Fill all required fields: email, password, confirm password.",
      });
    }

    const emailExist = await checkEmail(email);
    if (emailExist) {
      return res.status(400).json({
        message: "Email has already.",
      });
    }

    if (password !== cf_password) {
      return res.status(400).json({
        message: "Password not match",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const username = email.split("@")[0];
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/signout", (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout successful." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.put("/profile/:id/update", isAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, address, tel } = req.body;
    const user = await User.findById(userId);
    if (user) {
      if (username) user.username = username;
      if (address) user.address = address;
      if (tel) user.tel = tel;
      await user.save();
      return res
        .status(200)
        .json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          tel: user.tel,
          address: user.address,
        });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
