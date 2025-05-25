import * as mongoose from "mongoose";
mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`
  )
  .then(() => {
    console.log("connection is open...");
  })
  .catch((err) => console.log("failed to connect", err.message));
