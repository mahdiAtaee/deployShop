import * as mongoose from "mongoose";
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection is open...");
  })
  .catch((err) => console.log("failed to connect", err.message));
