import userApiRouter from "./api/users";
import moviesApiRouter from "./api/movies";
import { verifyAccessToken } from "../helpers/security";

export default app => {
  app.use("/api/users", userApiRouter);

  app.use((req, res, next) => {
    const { authorization } = req.headers;
    console.warn(authorization.split(" ")[1]);
    const space = String.fromCharCode(32);
    const accessToken =
      authorization && authorization.replace(/\s\s+/g, space).split(space)[1];
    try {
      verifyAccessToken(accessToken);
      next();
    } catch (err) {
      switch (err.message) {
        case "jwt expired":
          res.status(401).send(err.message);
          break;
        default:
          res.status(400).send(err.message);
      }
    }
  });
  app.use("/api/movies", moviesApiRouter);

  return app;
};
