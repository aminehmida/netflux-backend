import jwt from "jsonwebtoken";
import crypto from "crypto";

const HUSH = "hushhhh";
const EXPIRES_IN = 60 * 15;
const ENCRYPTION_ALGORITHM = "sha1";
export const generateAccessToken = userId =>
  jwt.sign({ sub: userId }, HUSH, {
    expiresIn: EXPIRES_IN
  });

export const verifyAccessToken = token => jwt.verify(token, HUSH);

export const encryptPassword = password =>
  crypto
    .createHash(ENCRYPTION_ALGORITHM)
    .update(JSON.stringify(password))
    .digest("hex");
