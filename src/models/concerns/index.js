import { encryptPassword } from "../../helpers/security";

export function preSaveEncryprtPassword(next) {
  if (this.password) this.password = encryptPassword(this.password);
  next();
}

export const requiredString = {
  type: String,
  required: true
};

export const requiredNumber = {
  type: String,
  required: true
};

export const createdAt = {
  type: Date,
  default: Date.now
};

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

export const languages = {
  EN: "en",
  AR: "ar"
};

export const videoSources = {
  YOUTUBE: "youtube",
  VIMEO: "Vimeo"
};

export const videoTypes = {
  TRAILURE: "Trailer",
  FEATURETTE: "Featurette",
  FULL_MOVIE: "Full movie"
};
