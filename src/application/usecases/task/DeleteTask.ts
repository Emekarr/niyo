import eventEmitter from "../../eventEmitter";
import Logger from "../../loggers/Logger";
import { LoggerLevel } from "../../loggers/types";
import taskRepo from "../../repository/taskRepo";

export default abstract class DeleteTask {
  static async execute(userID: string, taskID: string) {
    const task = await taskRepo.instance.remove({
      userID,
      _id: taskID,
    });
    Logger.instance.write(LoggerLevel.info, "task deleted");
    eventEmitter.instance.emitEvent("SOCKET_EVENT", {
      channel: "DELETE_TASK",
      data: task,
    });
    return task;
  }
}
