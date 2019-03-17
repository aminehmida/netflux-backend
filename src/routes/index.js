import userApiRouter from "./api/users";
import moviesApiRouter from "./api/movies";
import { verifyAccessTokenMiddleware } from "../middleware";

export default app => {
  app.use("/api/users", userApiRouter);
  app.use("/api/movies/*", verifyAccessTokenMiddleware);
  app.use("/api/movies", moviesApiRouter);
  return app;
};
