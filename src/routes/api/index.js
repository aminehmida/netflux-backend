import { Router } from "express";
import Movie from "../../models/Movie";

const apiRouter = Router();

apiRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (err) {
    res.status(404).json({ msg: "No movies found" });
  }
});

export default apiRouter;
