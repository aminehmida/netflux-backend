import mongoose from "mongoose";
import { encryptPassword } from "../../helpers/security";
import { preSaveEncryprtPassword } from "../concerns";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
