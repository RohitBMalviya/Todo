import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRE,
} from "../utils/config.js";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Please enter unique Username"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      required: true,
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
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    accessToken: {
      type: String,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    verifiedToken: {
      type: String,
      select: false,
    },
    verifiedTokenExpire: {
      type: Date,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
      select: false,
    },
    forgotPasswordTokenExpire: {
      type: Date,
      select: false,
    },
    todo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
    phoneNumber: {
      type: Number,
      unique: true,
      validate: {
        validator: function (phone) {
          return /\B\+91 [0-9]{10}\b/.test(phone);
        },
        message: "Invalid phone number formate",
      },
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    birthDay: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password confirm_password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
  }
  next();
});
userSchema.methods.compareGenerateHashPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return JWT.sign({ _id: this._id, email: this.email }, ACCESS_TOKEN, {
    algorithm: "HS512",
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};
userSchema.methods.generateRefreshToken = function () {
  return JWT.sign({ _id: this._id, email: this.email }, REFRESH_TOKEN, {
    algorithm: "HS512",
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
};
export const User = mongoose.model("User", userSchema);

export default User;
