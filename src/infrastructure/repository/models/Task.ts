import { Document, Schema, SchemaTypes } from "mongoose";
import base from "./base";
import Task from "../../../entities/domain/Task";

export interface TaskModel extends Task, Omit<Document, "id"> {}

export const TaskSchema = new Schema({
  title: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  body: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  userID: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
    index: true,
  },
  ...base,
});
