import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/stripe.js";
import cors from "cors";
// import verifyToken from "./routes/verifyToken.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("error=====>", err);
  });

//api
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);//ok
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
