import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  generateAccessToken,
  verifyAccessToken,
  encryptPassword
} from "./index";

jest.mock("jsonwebtoken");
jest.mock("crypto");

describe("jwt", () => {
  const token = "somereallylongtoken";
  const userId = "some-user-id";
  describe("generateAccessToken", () => {
    it("generates access token for a given ID", () => {
      const spyOnSign = jest.spyOn(jwt, "sign");
      jwt.sign.mockImplementation(() => token);
      const result = generateAccessToken(userId);
      expect(spyOnSign).toHaveBeenCalledWith({ sub: userId }, "hushhhh", {
        expiresIn: 900
      });
      expect(result).toEqual(token);
    });
  });

  describe("verifyAccessToken", () => {
    it("validates token and returns payload", () => {
      const decoded = {
        sub: userId,
        iat: Date.now(),
        exp: Date.now() + 900000
      };

      const spyOnVerify = jest.spyOn(jwt, "verify");
      jwt.verify.mockImplementation(() => decoded);

      const result = verifyAccessToken(token);
      expect(spyOnVerify).toHaveBeenCalled();
      expect(result).toEqual(decoded);
    });
  });

  describe("encryptPassword", () => {
    it("encrypts input using sha1", () => {
      crypto.createHash.mockImplementation(() => ({
        update: () => ({
          digest: () => "sha1-password"
        })
      }));

      const cryptoSpy = jest.spyOn(crypto, "createHash");
      expect(encryptPassword("password")).toEqual("sha1-password");
      expect(cryptoSpy).toHaveBeenCalledWith("sha1");
    });
  });
});
