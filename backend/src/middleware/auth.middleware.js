import JWT from "jsonwebtoken";
import { ApiError, config } from "../utils/index.js";
import { User } from "../models/index.js";

export default async function auth(request, _, next) {
  try {
    const token =
      request.cookies?.accessToken ||
      request.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(404, "Token not found or expired.");
    }
    const decodeToken = JWT.verify(token, config.ACCESS_TOKEN);
    const user = await User.findById(decodeToken._id).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    request.body = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
}
