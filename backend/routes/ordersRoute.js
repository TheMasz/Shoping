import express from "express";
import { isAdmin, isAuth } from "../utils/index.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";

const router = express.Router();

router.get("/user/:id", isAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.aggregate([
      {
        $match: { $expr: { $eq: ["$userId", { $toObjectId: userId }] } },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              productId: "$products.productId",
              qty: "$products.qty",
              productDetails: "$productDetails",
            },
          },
          userId: { $first: "$userId" },
          payment: { $first: "$payment" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    return res.status(200).json({ orders: orders });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/create", isAuth, async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();
  try {
    const { userId, carts } = req.body;
    const totalPrice = carts.reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0);
    const products = carts.map((product) => ({
      productId: product._id,
      qty: product.qty,
    }));

    const newOrder = new Order({
      products,
      userId,
      payment: "success",
      totalPrice: totalPrice,
    });

    await newOrder.save({ session });


    const updatePromises = carts.map(async (product) => {
      const updateProduct = await Product.findById(product._id).session(
        session
      );
      if (!updateProduct) {
        throw new Error(`Product with id ${product._id} not found`);
      }
      updateProduct.qty -= product.qty;
      await updateProduct.save({ session });
    });

    await Promise.all(updatePromises);

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(newOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
});

router.get("/admin", isAuth, isAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  try {
    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / perPage);
    const skipIndex = (page - 1) * perPage;

    const orders = await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              productId: "$products.productId",
              qty: "$products.qty",
              productDetails: "$productDetails",
            },
          },
          userId: { $first: "$userId" },
          payment: { $first: "$payment" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])
      .skip(skipIndex)
      .limit(perPage);

    return res.status(200).json({
      orders: orders,
      currentPage: page,
      totalPages,
      totalOrders,
      perPage: perPage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.put("/admin/:id/update", isAuth, isAdmin, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    order.status = orderStatus;
    await order.save();
    return res.status(200).json({ order: order, message: "Order updated." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/admin/:id/delete", isAuth, isAdmin, async (req, res) => {
  try {
    const orderId = req.params.id;
    const removed = await Order.findByIdAndDelete(orderId);
    if (removed) {
      return res.status(200).json({ message: "Order deleted." });
    } else {
      return res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
