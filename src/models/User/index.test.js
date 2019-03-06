import User from "./index";

describe("User", () => {
  it("saves user", async () => {
    const newUser = new User({
      firstName: "عادل",
      lastName: "إمام",
      email: "adelimam@email.com",
      isAdmin: true
    });

    await newUser.save();

    const user = await User.findOne({
      firstName: "عادل"
    });
    expect(user).toMatchObject({
      firstName: "عادل",
      lastName: "إمام",
      email: "adelimam@email.com",
      isAdmin: true
    });
  });
});
