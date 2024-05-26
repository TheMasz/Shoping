import express from "express";
import { isAuth } from "../utils/index.js";
import { Product } from "../models/productModel.js";

const router = express.Router();

router.get("/getAll", isAuth, async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
