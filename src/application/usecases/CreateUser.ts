import { ValidatorSchemas } from "../../entities/interfaces/Validator";
import { CreateUserDTO } from "../controllers/dto/auth";
import hasher from "../cryptography/hasher";
import BaseError from "../errors/BaseError";
import Logger from "../loggers/Logger";
import { LoggerLevel } from "../loggers/types";
import userRepo from "../repository/userRepo";
import validator from "../validator";

export default abstract class CreateUser {
  static async execute(
    payload: CreateUserDTO,
    deviceID: string,
    userAgent: string,
    appVersion: string
  ) {
    const result = validator.instance.validate(
      { ...payload, deviceID, userAgent, appVersion },
      ValidatorSchemas.create_user
    );
    if (result.err) {
      throw new BaseError(result.err.message, 400, false);
    }
    result.value.password = await hasher.instance.hash(result.value.password);
    const createdUser = await userRepo.instance.create(result.value);
    Logger.instance.write(LoggerLevel.info, "user created successfully");
    return createdUser;
  }
}
