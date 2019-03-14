import { preSaveEncryprtPassword } from "./index";
import * as helpers from "../../helpers/security";

jest.mock("../../helpers/security");

describe("Model helpers", () => {
  describe("preSaveEncryprtPasswordm", () => {
    it("encrypt given password", () => {
      helpers.encryptPassword.mockImplementation(() => "encrypted-password");

      function someObject() {
        this.password = "some-password";
        this.next = jest.fn;
        this.preSaveEncryprtPassword = preSaveEncryprtPassword.bind(this);
        this.preSaveEncryprtPassword(this.next);
        expect(this.password).toEqual("encrypted-password");
      }

      new someObject();
    });
  });
});
