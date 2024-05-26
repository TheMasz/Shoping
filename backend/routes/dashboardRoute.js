import express from "express";
import { isAdmin, isAuth } from "../utils/index.js";
import { Product } from "../models/productModel.js";
import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    const totalPrice = orders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    const totalOrders = orders.length;
    const totalProducts = await Product.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const shippingOrders = await Order.countDocuments({ status: "shipping" });

    const totalUsers = await User.countDocuments();
    const distinctUserIds = [
      ...new Set(orders.map((order) => order.userId.toString())),
    ];
    const usersWithOrders = distinctUserIds.length;
    const usersWithoutOrders = totalUsers - usersWithOrders;
    
    return res.status(200).json({
      totalOrders,
      totalProducts,
      pendingOrders,
      shippingOrders,
      totalPrice,
      totalUsers,
      usersWithOrders,
      usersWithoutOrders,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
