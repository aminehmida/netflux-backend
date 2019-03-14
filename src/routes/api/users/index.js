import { Router } from "express";
import User, { findUser } from "../../../models/User";
import { generateAccessToken } from "../../../helpers/security";

const apiRouter = Router();

apiRouter.post("/sign-up", async (req, res) => {
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

apiRouter.post("/sign-in", async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res
      .status(400)
      .send({ description: "Your request is missing body params" });
    return;
  }

  const { email, password } = req.body;
  const user = await findUser({ email, password });
  if (user) {
    const accessToken = generateAccessToken(user["_id"]);
    res.status(200).send({ accessToken });
  } else {
    res.status(401).send({ description: "Wrong credentials" });
  }
});

export default apiRouter;
