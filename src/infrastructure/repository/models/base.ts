import { Schema, SchemaTypes } from "mongoose";
import { generateUniqueID } from "../../../application/utils";

export default {
  _id: {
    type: Schema.Types.String,
    default: () => generateUniqueID(),
    required: true,
  },
  createdAt: {
    type: SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  deletedAt: {
    type: SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
};
