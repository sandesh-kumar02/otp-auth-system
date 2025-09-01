import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const signUpUser = (req, res) => {
  res.render("auth/signup", { errors: {} });
};

export const login = (req, res) => {
  res.render("auth/login");
};

export const forgot = (req, res) => {
  res.render("otp/forgot-password");
};

export const Verify = (req, res) => {
  res.render("otp/verify-otp");
};

export const Reset = (req, res) => {
  res.render("otp/reset-password");
};

export const signUpData = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("auth/signup", {
      errors: errors.mapped(),
    });
  }
  try {
    const { username, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    console.log(result);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(401).send("something went wrong");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.send("Invalid email or password");
  }
  const comparePwd = await bcrypt.compare(password, user.password);
  if (!comparePwd) {
    return res.send("Invalid email or password");
  }
  res.send("you are logdin");
};
