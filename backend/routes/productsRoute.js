import express from "express";
import Stripe from "stripe";
import fs from "fs/promises";
import dotenv from "dotenv";

import { isAdmin, isAuth } from "../utils/index.js";
import { Product } from "../models/productModel.js";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/addMany", async (req, res) => {
  try {
    const data = await fs.readFile("./initialProducts.json", "utf8");
    const products = JSON.parse(data);

    const result = await Product.insertMany(products);
    res
      .status(200)
      .send(`Products added successfully, count: ${result.length}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding products");
  }
});

router.get("/deleteMany", async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res
      .status(200)
      .send(`Products deleted successfully, count: ${result.deletedCount}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding products");
  }
});

router.get("/", isAuth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);
    const skipIndex = (page - 1) * perPage;

    const products = await Product.find().skip(skipIndex).limit(perPage);

    return res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      perPage: perPage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/categories/:category", isAuth, async (req, res) => {
  const category = req.params.category;

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  try {
    const totalProducts = await Product.countDocuments({ category: category });
    const totalPages = Math.ceil(totalProducts / perPage);
    const skipIndex = (page - 1) * perPage;

    const products = await Product.find({ category: category })
      .skip(skipIndex)
      .limit(perPage);
    return res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      perPage: perPage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json({ product: product });
    } else {
      return res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/create", isAuth, isAdmin, async (req, res) => {
  try {
    const { name, detail, category, qty, price } = await req.body;
    const newProduct = new Product({
      name,
      desc: detail,
      category,
      qty,
      price,
    });
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id/update", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  try {
    const updateProduct = await Product.findById(productId);
    updateProduct.name = product.name;
    updateProduct.desc = product.detail;
    updateProduct.category = product.category;
    updateProduct.qty = product.qty;
    updateProduct.price = product.price;
    await updateProduct.save();
    return res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id/delete", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  try {
    const removed = await Product.findOneAndDelete({ _id: productId });
    if (removed) {
      return res.status(200).json({ message: "Post removed" });
    } else {
      return res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/create-checkout-session", isAuth, async (req, res) => {
  const { products } = req.body;
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "THB",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qty,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/checkout/success",
      cancel_url: "http://localhost:5173/checkout/cancel",
    });
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
