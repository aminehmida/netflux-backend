import Movie from "./index";
import { languages, genres, videoTypes, videoSources } from "../concerns";
process.env.TEST_SUITE = "movies-models-systems-test";

describe("Movie", () => {
  beforeEach(done => {
    Movie.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });
  it("saves movie", async () => {
    const data = {
      originalTitle: "Creed II",
      originalOverview: "Original English overview",
      posterPath: "/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg",
      backdropPath: "/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg",
      popularity: 206.581,
      voteAverage: 6.8,
      releaseDate: "2018-11-20",
      genres: [genres.HORRORS],
      category: "Film",
      language: languages.EN,
      movieVideos: [
        {
          title: "Creed II - Trailure",
          key: "pNjk91ATS-Y",
          site: videoSources.YOUTUBE,
          type: videoTypes.TRAILURE
        }
      ],
      movieLanguages: [
        {
          title: "كريد ٢",
          language: languages.AR,
          overview: "شرح كامل مفصل بالعربي"
        }
      ]
    };

    const newMovie = new Movie(data);

    await newMovie.save();

    const movie = await Movie.findOne({
      originalTitle: "Creed II"
    });

    const { __v, _id, createdAt, ...matchingMovieObject } = movie._doc;

    expect(matchingMovieObject._id).toEqual(data._id);
    expect(matchingMovieObject.movieLanguages[0].title).toEqual(
      data.movieLanguages[0].title
    );
  });
});
