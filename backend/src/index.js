import connect from "./database/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

const PORT = process.env.PORT || 5000;

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
