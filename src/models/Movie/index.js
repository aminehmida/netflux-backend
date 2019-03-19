import mongoose from "mongoose";
import {
  createdAt,
  requiredNumber,
  requiredString,
  languages,
  categories,
  genres
} from "../concerns";
import { MovieVideoSchema } from "./MovieVideo";
import { MovieLanguageSchema } from "./MovieLanguage";

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  originalTitle: requiredString,
  originalOverview: requiredString,
  posterPath: requiredString,
  backdropPath: requiredString,
  popularity: requiredNumber,
  voteAverage: requiredNumber,
  releaseDate: requiredString,
  genres: {
    type: [{ type: String, enum: Object.values(genres) }],
    required: true
  },
  category: {
    type: String,
    enum: Object.values(categories),
    required: true
  },
  movieVideos: [MovieVideoSchema],
  movieLanguages: [MovieLanguageSchema],
  createdAt
});

export default mongoose.model("movie", MovieSchema);
