import Joi, { ObjectSchema } from "joi";

const createUserSchema = Joi.object({
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  deviceID: Joi.string().required(),
  userAgent: Joi.string(),
  appVersion: Joi.string().required(),
});

const createTaskSchema = Joi.object({
  title: Joi.string().max(200).required(),
  body: Joi.string().max(10000).required(),
  userID: Joi.string().uuid().required(),
});

const schemaMap: Record<string, ObjectSchema> = {
  create_user: createUserSchema,
  create_task: createTaskSchema,
};

export default schemaMap;
