import mongoose from "mongoose";
import { encryptPassword } from "../../helpers/security";

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
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  if (this.password) this.password = encryptPassword(this.password);
  next();
});

const User = mongoose.model("user", UserSchema);

export default User;
