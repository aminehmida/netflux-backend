import { verifyAccessToken } from "../helpers/security";

export const verifyAccessTokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const space = String.fromCharCode(32);

  try {
    const accessToken =
      authorization && authorization.replace(/\s\s+/g, space).split(space)[1];
    verifyAccessToken(accessToken);
    next();
  } catch (err) {
    switch (err.message) {
      case "jwt expired":
        res.status(401).send(err.message);
        break;
      case "jwt malformed":
        res.status(400).send(err.message);
        break;
      default:
        res.status(500).send(err.message);
    }
  }
};
