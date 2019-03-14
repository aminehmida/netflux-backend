import request from "supertest";
import routes from "./index";
import express from "express";
import bodyParser from "body-parser";
// import mockingoose from "mockingoose";
// import * as helpers from "../../helpers/security";

jest.mock("../../helpers/security");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

// beforeEach(() => {
//   mockingoose.resetAll();
// });

describe("api/users", () => {
  describe("POST /users/sign-in", () => {
    describe("when credentials are wrong", () => {
      it("should return 400 for a bad request with no email or password", done => {
        return request(app)
          .post("/users/sign-in")
          .type("form")
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(res.body.description).toEqual(
              "Your request is missing body params"
            );
            done();
          });
      });

      it("should return 401", done => {
        // userExists.mockImplementation(() => Promise.resolve(null));

        return request(app)
          .post("/users/sign-in")
          .type("form")
          .send({ email: "invalidemail@gail.com", password: "somepassword" })
          .expect(401)
          .end((err, res) => {
            expect(res.body.description).toEqual("Wrong credentials");
            done();
          });
      });
    });

    // describe("when credentials are correct", () => {
    //   it("should return 200 with accessToken", () => {
    //     helpers.encryptPassword.mockImplementation(() => "encrypted-password");
    //     mockingoose.User.toReturn(
    //       {
    //         email: "adelimam@gail.com",
    //         password: "encrypted-password"
    //       },
    //       "findOne"
    //     );

    //     request(app)
    //       .post("/users/sign-in")
    //       .type("form")
    //       .send({ email: "adelimam@gail.com", password: "password" })
    //       .expect(200);
    //   });
    // });
  });
});
