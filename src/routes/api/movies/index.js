import { Router } from "express";
import Movie from "../../../models/Movie";
import { genres, categories } from "../../../models/concerns";

const apiRouter = Router();

apiRouter.get("/search/:keyword", async (req, res) => {
  const {
    params: { keyword }
  } = req;
  const movies = await Movie.find({
    originalTitle: new RegExp(keyword, "i")
  });
  res.json({ movies });
});

apiRouter.get("/list/:category/:genre", async (req, res) => {
  const {
    params: { category, genre }
  } = req;

  if (!genres[genre.toUpperCase()]) {
    res.status(400).send(`Invalid genre ${genre}`);
    return;
  }

  if (!categories[category.toUpperCase()]) {
    res.status(400).send(`Invalid category ${category}`);
    return;
  }

  const movies = await Movie.find({
    category: category.toUpperCase(),
    genre: genre.toUpperCase()
  });

  res.json({ movies });
});

apiRouter.get("/latest", async (_, res) => {
  const movies = await Movie.find();
  res.json({ movies });
});

export default apiRouter;
