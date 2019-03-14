import userApiRouter from "./api/users";
import moviesApiRouter from "./api/movies";

export default app => {
  app.use("/api/users", userApiRouter);
  app.use("/api/movies", moviesApiRouter);

  return app;
};
