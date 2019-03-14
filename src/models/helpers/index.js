import { encryptPassword } from "../../helpers/security";

export function preSaveEncryprtPassword(next) {
  if (this.password) this.password = encryptPassword(this.password);
  next();
}
