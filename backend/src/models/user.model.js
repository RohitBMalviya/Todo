import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Please Enter Unique username"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLenth: [true, "Please Enter the atleast 8 Character Password"],
    },
    confirm_password: {
      type: String,
      minLenth: [true, "Please Enter the atleast 8 Character Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedToken: {
      type: String,
    },
    verifiedTokenExpire: {
      type: Date,
    },
    todo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

export default User;
