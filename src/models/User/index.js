import mongoose from "mongoose";
import { encryptPassword } from "../../helpers/security";
import {
  preSaveEncryprtPassword,
  requiredString,
  createdAt
} from "../concerns";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: requiredString,
  lastName: requiredString,
  password: requiredString,
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt
});

UserSchema.pre("save", preSaveEncryprtPassword);

const User = mongoose.model("user", UserSchema);

export const findUser = async ({ email, password }) => {
  const user = await User.findOne({
    email,
    password: encryptPassword(password)
  });

  return user;
};

export default User;
