import { ValidatorSchemas } from "../../../entities/interfaces/Validator";
import { UpdateTaskDTO } from "../../controllers/dto/task";
import BaseError from "../../errors/BaseError";
import eventEmitter from "../../eventEmitter";
import Logger from "../../loggers/Logger";
import { LoggerLevel } from "../../loggers/types";
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
    const task = await taskRepo.instance.updateOne(
      {
        userID,
        _id: taskID,
      },
      result.value
    );
    Logger.instance.write(LoggerLevel.info, "task updated");
    eventEmitter.instance.emitEvent("SOCKET_EVENT", {
      channel: "UPDATE_TASK",
      data: task,
    });
    return task;
  }
}
