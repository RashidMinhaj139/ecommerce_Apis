import express from "express";
import Product from "../models/product.js";
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedproduct = await newProduct.save();
    res.status(200).json(savedproduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //body me jo ai update krdo
      },
      { new: true } //to retur in db
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product  has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET products
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.find(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET All products
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCatagory = req.query.category;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCatagory) {
      products = await Product.find({
        categories: { $in: [queryCatagory] },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
