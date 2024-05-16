import { ValidatorSchemas } from "../../../entities/interfaces/Validator";
import { UpdateTaskDTO } from "../../controllers/dto/task";
import BaseError from "../../errors/BaseError";
import taskRepo from "../../repository/taskRepo";
import validator from "../../validator";

export default abstract class UpdateTask {
  static async execute(payload: UpdateTaskDTO, userID: string, taskID: string) {
    const result = validator.instance.validate(
      payload,
      ValidatorSchemas.update_task
    );
    if (result.err) {
      throw new BaseError(result.err.message, 400, false);
    }
    const task = taskRepo.instance.updateOne(
      {
        userID,
        _id: taskID,
      },
      result.value
    );
    return task;
  }
}
