import User, { findUser } from "./index";
import * as helpers from "../../helpers/security";
import { clearDB } from "../../config/jestSetup";
jest.mock("../../helpers/security");

describe("User", () => {
  describe("existExists", () => {
    it("checks if user exists", async () => {
      helpers.encryptPassword.mockImplementation(() => "encrypted-password");
      const newUser = new User({
        firstName: "عادل",
        lastName: "إمام",
        email: "adelimam@email.com",
        password: "password"
      });

      await newUser.save();
      const user = await findUser({
        email: "adelimam@email.com",
        password: "password"
      });

      expect(user).toMatchObject({
        firstName: "عادل",
        lastName: "إمام",
        email: "adelimam@email.com"
      });
    });
  });
});
