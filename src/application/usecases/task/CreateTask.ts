import { ValidatorSchemas } from "../../../entities/interfaces/Validator";
import { CreateTaskDTO } from "../../controllers/dto/task";
import BaseError from "../../errors/BaseError";
import taskRepo from "../../repository/taskRepo";
import validator from "../../validator";

export default abstract class CreateTask {
  static async execute(payload: CreateTaskDTO, userID: string) {
    const result = validator.instance.validate(
      { ...payload, userID },
      ValidatorSchemas.create_task
    );
    if (result.err) {
      throw new BaseError(result.err.message, 400, false);
    }
    const task = taskRepo.instance.create(result.value);
    return task;
  }
}
