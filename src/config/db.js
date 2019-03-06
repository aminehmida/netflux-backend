import mongoose from "mongoose";

export default () => {
  mongoose
    .connect("mongodb://mongo:27017/netflux")
    .then(() => {
      console.log("MongoDB started");
    })
    .catch(err => {
      console.error(err);
    });
};
