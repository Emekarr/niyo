import { BaseModel } from ".";

export default interface User extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  deviceID: string;
  appVersion: string;
  userAgent: string;
}
