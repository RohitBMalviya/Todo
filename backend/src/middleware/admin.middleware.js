import JWT from "jsonwebtoken";
import { ApiError, PromiseHandle, config } from "../utils/index.js";

export default function admin(request, _, next) {
  if (request.user.role !== "admin") {
    throw new ApiError(404, "Not authorized to access only admin can access.");
  }
  next();
}
