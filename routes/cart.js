import express from "express";
import Product from "../models/product.js";
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} from "./verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Product(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //body me jo ai update krdo
      },
      { new: true } //to retur in db
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart  has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET All products
router.get("/", verifyTokenAndAdmin,async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }}
);

export default router;
