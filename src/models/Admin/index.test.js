import User, { userExists } from "./index";
import * as helpers from "../../helpers/security";
jest.mock("../../helpers/security");

describe("User", () => {
  describe("existExists", () => {
    it("checks if user exists", async () => {
      helpers.encryptPassword.mockImplementation(() => "encrypted-password");
      const newUser = new User({
        firstName: "عادل",
        lastName: "إمام",
        email: "adelimam@email.com",
        password: "password",
        isAdmin: true
      });

      await newUser.save();
      expect(
        await userExists({ email: "adelimam@email.com", password: "password" })
      ).toMatchObject({
        firstName: "عادل",
        lastName: "إمام",
        email: "adelimam@email.com",
        isAdmin: true
      });
    });
  });
});
