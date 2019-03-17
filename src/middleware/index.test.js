import { verifyAccessTokenMiddleware } from "./";
import * as helpers from "../helpers/security";
jest.mock("../helpers/security");

describe("verifyAccessTokenMiddleware", () => {
  const next = jest.fn();

  describe("success", () => {
    it("calls next", () => {
      const req = {
        headers: { authorization: "Bearer    ifta7yasumsum" }
      };

      const res = {};

      const verifyAccessTokenVerify = jest.spyOn(helpers, "verifyAccessToken");
      verifyAccessTokenMiddleware(req, res, next);
      expect(verifyAccessTokenVerify).toHaveBeenCalledWith("ifta7yasumsum");
      expect(next).toHaveBeenCalled();
    });
  });

  describe("failure", () => {
    const statusSpy = jest.fn();
    const sendSpy = jest.fn();
    const res = {
      status: statusSpy.mockImplementation(() => ({
        send: sendSpy
      }))
    };

    describe("accessToken does not exist", () => {
      it("fails with 500 error", () => {
        const req = {
          headers: { authorization: "Bearer  " }
        };

        const verifyAccessTokenVerify = jest.spyOn(
          helpers,
          "verifyAccessToken"
        );
        verifyAccessTokenVerify.mockImplementation(() => {
          throw new Error("Anything");
        });
        verifyAccessTokenMiddleware(req, res, next);
        expect(verifyAccessTokenVerify).toHaveBeenCalledWith("");
        expect(statusSpy).toHaveBeenCalledWith(500);
        expect(sendSpy).toHaveBeenCalledWith("Anything");
      });
    });

    describe("accessToken is malformed", () => {
      it("fails with 400 error", () => {
        const req = {
          headers: { authorization: "Bearer ifta7yasumsum" }
        };

        const verifyAccessTokenVerify = jest.spyOn(
          helpers,
          "verifyAccessToken"
        );

        verifyAccessTokenVerify.mockImplementation(() => {
          throw new Error("jwt malformed");
        });

        verifyAccessTokenMiddleware(req, res, next);
        expect(verifyAccessTokenVerify).toHaveBeenCalledWith("");
        expect(statusSpy).toHaveBeenCalledWith(400);
        expect(sendSpy).toHaveBeenCalledWith("jwt malformed");
      });
    });

    describe("accessToken is expired", () => {
      it("fails with 401 error", () => {
        const req = {
          headers: { authorization: "Bearer ifta7yasumsum_expired" }
        };

        const verifyAccessTokenVerify = jest.spyOn(
          helpers,
          "verifyAccessToken"
        );

        verifyAccessTokenVerify.mockImplementation(() => {
          throw new Error("jwt expired");
        });

        verifyAccessTokenMiddleware(req, res, next);
        expect(verifyAccessTokenVerify).toHaveBeenCalledWith("");
        expect(statusSpy).toHaveBeenCalledWith(401);
        expect(sendSpy).toHaveBeenCalledWith("jwt malformed");
      });
    });
  });
});
