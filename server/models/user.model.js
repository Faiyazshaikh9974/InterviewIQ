import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },

    credits: {
        type: Number,
        default: 100
    }
  },
  {
    timestamps: true,
  },
);


export const User = mongoose.model("User", userSchema)
