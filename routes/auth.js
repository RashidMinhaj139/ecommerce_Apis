import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const router = express.Router();

//Register okk
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    // const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SEC, {
    //   expiresIn: "3d",
    // });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({
        status: 200,
        message: "success",
        data: savedUser /*,accessToken*/,
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login okk
router.post("/login", async (req, res) => {
  try {
    const LoginUser = await User.findOne({ username: req.body.username });
    !LoginUser && res.status(401).json("Wrong Credentials!");
    const hashedPassword = CryptoJS.AES.decrypt(
      LoginUser.password,
      process.env.PASS_SEC
    );
    const OrignalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OrignalPassword !== req.body.password &&
      res.status(401).json("Wrong Password");
    //jwt
    const accessToken = jwt.sign(
      {
        id: LoginUser._id,
        isAdmin: LoginUser.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    //jwt
    const { password, ...others } = LoginUser._doc;
    res.status(200).json({
      status: 200,
      message: "Login Successfully",
      ...others,
      accessToken,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
});

export default router;
