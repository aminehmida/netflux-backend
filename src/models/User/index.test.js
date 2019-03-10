import User from "./index";
import * as helpers from "../../helpers/security";
jest.mock("../../helpers/security");

describe("User", () => {
  it("saves user", async () => {
    helpers.encryptPassword.mockImplementation(() => "encrypted-password");
    const newUser = new User({
      firstName: "عادل",
      lastName: "إمام",
      email: "adelimam@email.com",
      password: "password",
      isAdmin: true
    });

    await newUser.save();

    const user = await User.findOne({
      email: "adelimam@email.com"
    });

    expect(user).toMatchObject({
      firstName: "عادل",
      lastName: "إمام",
      email: "adelimam@email.com",
      password: "encrypted-password",
      isAdmin: true
    });
  });
});
