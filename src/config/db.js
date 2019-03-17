import mongoose from "mongoose";

export default () =>
  mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}/netflux`);
