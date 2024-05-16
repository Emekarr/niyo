import { BaseModel } from ".";

export default interface Task extends BaseModel {
  title: string;
  body: string;
  userID: string;
}
