import User, { findUser } from "./index";
import * as helpers from "../../helpers/security";
jest.mock("../../helpers/security");
process.env.TEST_SUITE = "users-models-systems-test";

describe("User", () => {
  beforeEach(done => {
    User.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  describe("findUser", () => {
    it("checks if user exists", async () => {
      helpers.encryptPassword.mockImplementation(() => "encrypted-password");

      const newUser = new User({
        firstName: "sadiq",
        lastName: "khan",
        email: "londonmayor@email.com",
        password: "password"
      });

      await newUser.save();
      const user = await findUser({
        email: "londonmayor@email.com",
        password: "password"
      });

      expect(user).toMatchObject({
        firstName: "sadiq",
        lastName: "khan",
        email: "londonmayor@email.com"
      });
    });
  });
});
