import mongoose from "mongoose";
import { config } from "../utils/index.js";

async function connect() {
  try {
    const connectMongoose = await mongoose.connect(`${config.MONGOOOSEURL}`);

    console.log(
      `Database Connected Successfully DB Host: ${connectMongoose.connection.host}`
    );
  } catch (error) {
    console.error("Database Connected Failed: ", error);
  }
}

export default connect;
