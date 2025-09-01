import { body } from "express-validator";

const signupValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Username must only contain letters and spaces")
    .trim(),

  body("email")
    .isEmail()
    .withMessage("please enter valid email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("paaaword is required"),
];

export default signupValidation;
