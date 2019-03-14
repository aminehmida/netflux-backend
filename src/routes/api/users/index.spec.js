import request from "supertest";
import routes from "./index";
import express from "express";
import bodyParser from "body-parser";
import User from "../../../models/User";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

describe("api/users", () => {
  describe("POST /sign-up", () => {
    const newUser = {
      firstName: "Adel",
      lastName: "Imam",
      email: "adelimam@gmail.com",
      password: "password"
    };

    describe("when user does not exist", () => {
      it("should return 200 ", done => {
        request(app)
          .post("/sign-up")
          .type("form")
          .send(newUser)
          .expect(200, done);
      });
    });

    it("returns 409 when user already exists", async () => {
      const user = new User(newUser);
      await user.save();

      request(app)
        .post("/sign-up")
        .type("form")
        .send(newUser)
        .expect(409)
        .end((err, res) => {
          expect(res.body.description).toEqual("User already exists");
        });
    });
  });

  describe("POST /sign-in", () => {
    describe("when credentials are wrong", () => {
      it("should return 400 for a bad request with no email or password", done => {
        request(app)
          .post("/sign-in")
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
        request(app)
          .post("/sign-in")
          .type("form")
          .send({ email: "invalidemail@gail.com", password: "somepassword" })
          .expect(401)
          .end((err, res) => {
            expect(res.body.description).toEqual("Wrong credentials");
            done();
          });
      });
    });

    describe("when credentials are correct", () => {
      it("should return 200 with accessToken", async () => {
        const newUser = {
          firstName: "John",
          lastName: "Smith",
          email: "johnsmith@gmail.com",
          password: "password"
        };
        const user = new User(newUser);

        await user.save();

        request(app)
          .post("/sign-in")
          .type("form")
          .send({ email: "john@gmail.com", password: "password" })
          .expect(200);
      });
    });
  });
});
