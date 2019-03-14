import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const genres = {
  ACTION_AND_ADVENTURES: "Actions & Adventures",
  AMERICAN: "American",
  DRAMA: "Drama",
  SCI_FI_AND_FANTASY: "Sci-Fi & Fantasy",
  KIDS: "Kids",
  THRILLER: "Thirller",
  TEENS: "Teens",
  ROMANCE: "Romance",
  HORROR: "Horror",
  COMEDY: "Comedy"
};

export const categories = {
  FILM: "Film",
  SERIES: "Series",
  DOCUMENTRY: "Documentry"
};

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: Object.keys(categories),
    required: true
  },
  genre: {
    type: [{ type: String, enum: Object.keys(genres) }],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("movie", MovieSchema);
