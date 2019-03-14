import request from "supertest";
import routes from "./index";
import express from "express";
import bodyParser from "body-parser";
import { movies } from "./index.fixtures";
import Movie from "../../../models/Movie";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

const cleanResponse = responseMovies =>
  responseMovies.map(movie => {
    delete movie._id;
    delete movie["createdAt"];
    return movie;
  });

describe("api/movies", () => {
  describe("GET /latest", () => {
    it("returns the home movies", async () => {
      await Movie.collection.insert(movies);

      const response = await request(app).get("/latest");
      expect(response.status).toEqual(200);
      expect(cleanResponse(JSON.parse(response.text)["movies"])).toEqual(
        cleanResponse(movies)
      );
    });

    it("returns an empty array when for a genre that does not exist", async () => {
      await Movie.collection.insert(movies);
      const response = await request(app).get("/list/film/horror");
      expect(response.status).toEqual(200);
      expect(cleanResponse(JSON.parse(response.text)["movies"])).toEqual(
        cleanResponse(
          movies.filter(
            m => m.category === "FILM" && m.genre.includes("HORROR")
          )
        )
      );
    });
  });

  describe("GET /list/:category/:genre", () => {
    it("returns 400 if category is invalid", async () => {
      request(app)
        .get("/list/invalid-category/horror")
        .expect(400)
        .end((err, res) => {
          expect(res.text).toEqual("Invalid category invalid-category");
        });
    });

    it("returns 400 if genre is invalid", async () => {
      request(app)
        .get("/list/film/wrong-genre")
        .expect(400)
        .end((err, res) => {
          expect(res.text).toEqual("Invalid genre wrong-genre");
        });
    });
  });

  describe("GET /search/:keyword", () => {
    it("returns one movie for a full movie name", async () => {
      await Movie.collection.insert(movies);

      const response = await request(app).get("/search/hamstead");
      expect(response.status).toEqual(200);
      expect(cleanResponse(JSON.parse(response.text)["movies"])).toEqual(
        cleanResponse(movies.filter(m => m.name === "Hamstead"))
      );
    });
  });
});
