import mongoose from "mongoose";
import { preSaveEncryprtPassword } from "../concerns";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    reqiured: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AdminSchema.pre("save", preSaveEncryprtPassword);

const Admin = mongoose.model("admin", AdminSchema);

export default Admin;
