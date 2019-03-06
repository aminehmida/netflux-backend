import Movie from "./index";

describe("Movie", () => {
  it("saves movie", async () => {
    const newMovie = new Movie({
      name: "I am legend",
      year: 2011,
      image: "https://..."
    });

    await newMovie.save();

    const movie = await Movie.findOne({
      name: "I am legend"
    });

    expect(movie).toMatchObject({
      name: "I am legend",
      year: 2011,
      image: "https://..."
    });
  });
});
