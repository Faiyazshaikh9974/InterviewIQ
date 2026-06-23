import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      dbUser = await User.create({
        name,
        email,
      });
    }

    let token = await jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      http: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(dbUser);
  } catch (error) {
    res.status(500).json({
      message: `Google Authentication Error ${error}`,
    });
  }
};

export const logOutUser = async (req, res) => {
  try {
    await res.clearCookie("token");
    res.status(200).json({
      message: "User logout Successfully..",
    });
  } catch (error) {
    res.status(500).json({
      message: `Google Authentication Error ${error}`,
    });
  }
};
