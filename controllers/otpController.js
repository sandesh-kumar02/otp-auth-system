import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";
import User from '../models/user.js';
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email received:", email);
    const user = await User.findOne({ email: email });
    console.log("User found:", user);
    if (!user) {
      return res.send("user not found");
    }
    const otp = crypto.randomInt(100000, 999999);
    const otpExpiry = Date.now() + 5 * 60 * 1000;
    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sandeshkumar98014@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: "sandeshkumar98014@gmail.com",
      to: user.email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    res.redirect("/Verify");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send("User not found");
    }
    if (user.resetOTP !== otp) {
      return res.send("Invalid OTP");
    }
    if (Date.now() > user.resetOTPExpiry) {
      return res.send("OTP expired");
    }
    res.redirect("/reset");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send("User not found");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();
    res.send("Password reset successfully! You can now login.");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
