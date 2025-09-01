import express from "express";
import {
  signUpUser,
  signUpData,
  login,
  loginUser,
  forgot,
  Verify,
  Reset,
} from "../controllers/authController.js";
import {
  forgotPasswordController,
  verifyOTPController,
  resetPasswordController,
} from "../controllers/otpController.js";
import signupValidation from "../middlewares/validateInput.js";

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOTPController);
router.post("/reset-password", resetPasswordController);
router.get("/signup", signUpUser);
router.get("/login", login);
router.post("/signup", signupValidation, signUpData);
router.post("/login", loginUser);
router.get("/forgot", forgot);
router.get("/Verify", Verify);
router.get("/Reset", Reset);
export default router;
