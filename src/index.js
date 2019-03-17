import express from "express";
import bodyParser from "body-parser";
import initDB from "./config/db";
import addRouters from "./routes";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;
addRouters(app);

const retry = 5;

const init = async () => {
  try {
    await initDB();
    console.log("MongoDB started");
    app.listen(port, () => console.log("Server running..."));
  } catch (err) {
    console.warn(`MongoDB is not connected. Trying in ${retry} seconds`);
    await new Promise(resolve => setTimeout(resolve, retry * 1000));
    await init();
  }
};

init();
