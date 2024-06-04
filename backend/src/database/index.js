import mongoose from "mongoose";

async function connect() {
  try {
    const connectMongoose = await mongoose.connect(
      `${process.env.MONGOOOSEURL}`
    );

    console.log(
      `Database Connected Successfully DB Host: ${connectMongoose.connection.host}`
    );
  } catch (error) {
    console.error("Database Connected Failed: ", error);
  }
}

export default connect;
