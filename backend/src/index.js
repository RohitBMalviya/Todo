import connect from "./database/index.js";
import app from "./app.js";
import dotenv from "dotenv";
import { config } from "./utils/index.js";

dotenv.config({ path: "./env" });

const PORT = config.PORT || 5000;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on Port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server is Failed to run Error: ", error);
    process.exit(1);
  });
