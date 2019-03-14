import request from "supertest";
import routes from "./index";
import express from "express";
import bodyParser from "body-parser";
import { movies } from "./index.fixtures";
import Movie from "../../../models/Movie";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

describe("api/movies", () => {
  describe("GET /movies", () => {
    it("returns the home movies", async done => {
      await Movie.insertMany(movies);

      return request(app)
        .get("/")
        .expect(200)
        .end((err, res) => {
          expect(res).toEqual({});
          done();
        });
    });

    it("returns the list of films", () => {});

    it("returns the list of series", () => {});

    it("returns movies macthing search keyword", () => {});

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
