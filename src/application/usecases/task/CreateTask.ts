import { ValidatorSchemas } from "../../../entities/interfaces/Validator";
import { CreateTaskDTO } from "../../controllers/dto/task";
import BaseError from "../../errors/BaseError";
import eventEmitter from "../../eventEmitter";
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
    const task = await taskRepo.instance.create(result.value);
    eventEmitter.instance.emitEvent("SOCKET_EVENT", {
      channel: "CREATE_TASK",
      data: task,
    });
    return task;
  }
}
