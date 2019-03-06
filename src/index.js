import express from "express";
import bodyParser from "body-parser";
import initDB from "./config/db";
import addRouters from "./routes";

const app = express();

initDB();

app.use(bodyParser.urlencoded({ extended: false }));

addRouters(app);

const port = 3000;
app.listen(port, () => console.log("Server running..."));
