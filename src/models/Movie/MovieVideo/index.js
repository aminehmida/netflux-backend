import mongoose from "mongoose";
import { requiredString, videoSources, videoTypes } from "../../concerns";

const Schema = mongoose.Schema;

export const MovieVideoSchema = new Schema({
  title: requiredString,
  key: requiredString,
  site: {
    type: String,
    enum: Object.values(videoSources),
    required: true
  },
  type: {
    type: String,
    enum: Object.values(videoTypes),
    required: true
  }
});
