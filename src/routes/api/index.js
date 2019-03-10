import { Router } from "express";
import Movie from "../../models/Movie";
import User, { generateAccessToken } from "../../models/User";
import { Mongoose } from "mongoose";

const apiRouter = Router();

apiRouter.get("/movies", async (_, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (err) {
    res.status(404).json({ msg: "No movies found" });
  }
});

apiRouter.post("/users/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      password,
      email
    });
    await newUser.save();
    res.send();
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      res.status(409).send({ description: "User already exists" });
    } else {
      res.status(500).send(error);
    }
  }
});

apiRouter.post("/users/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    const accessToken = generateAccessToken(user["_id"]);
    res.send({ accessToken });
  } else {
    res.status(401).send({ description: "Wrong credentials" });
  }
});

export default apiRouter;
