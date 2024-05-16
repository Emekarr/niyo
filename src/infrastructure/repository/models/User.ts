import { Document, Schema, SchemaTypes } from "mongoose";
import User from "../../../entities/domain/User";
import base from "./base";

export interface UserModel extends User, Document {}

export const UserSchema = new Schema({
  firstName: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  lastName: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  password: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  email: {
    type: SchemaTypes.String,
    trim: true,
    index: true,
    required: true,
  },
  deviceID: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  appVersion: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  userAgent: {
    type: SchemaTypes.String,
    trim: true,
    required: true,
  },
  ...base,
});
