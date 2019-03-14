import Movie from "./index";

describe("Movie", () => {
  it("saves movie", async () => {
    const newMovie = new Movie({
      name: "I am legend",
      year: 2011,
      image: "https://...",
      category: "FILM",
      genre: ["COMEDY", "HORROR"]
    });

    await newMovie.save();

    const movie = await Movie.findOne({
      name: "I am legend"
    });

    const { __v, _id, createdAt, ...matchingMovieObject } = movie._doc;

    expect(JSON.stringify(matchingMovieObject)).toEqual(
      JSON.stringify({
        genre: ["COMEDY", "HORROR"],
        name: "I am legend",
        year: 2011,
        image: "https://...",
        category: "FILM"
      })
    );
  });
});
