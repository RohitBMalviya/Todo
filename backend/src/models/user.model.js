import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Please enter unique Username"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email address formate",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [
        8,
        "Please enter the atleast 8 Character Password ,got {VALUE}",
      ],
      maxLength: [
        16,
        "Password cannot exist 16 character Password ,got {VALUE}",
      ],
      validate: {
        validator: function (password) {
          return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
            password
          );
        },
        message: "Invalid password formate",
      },
    },
    confirm_password: {
      type: String,
      validate: {
        validator: function (confirm_password) {
          return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
            confirm_password
          );
        },
        message: "Invalid password formate",
      },
      minLength: [
        8,
        "Please enter the atleast 8 character Password ,got {VALUE}",
      ],
      maxLength: [
        16,
        "Password cannot Exist 16 character Password ,got {VALUE}",
      ],
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
