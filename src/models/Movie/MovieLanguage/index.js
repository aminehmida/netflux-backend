import mongoose from "mongoose";
import { requiredString, languages } from "../../concerns";

const Schema = mongoose.Schema;

export const MovieLanguageSchema = new Schema({
  title: requiredString,
  language: {
    type: String,
    enum: Object.values(languages),
    required: true
  },
  overview: requiredString
});
