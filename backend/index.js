import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import productsRoute from "./routes/productsRoute.js";
import ordersRoute from "./routes/ordersRoute.js";
import categoriesRoute from "./routes/categoriesRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/dashboard", dashboardRoute);


app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWRD}@db.ca2ih.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
