import { Context } from "../../entities/interfaces/Context";
import BaseError from "../errors/BaseError";
import CreateTask from "../usecases/task/CreateTask";
import UpdateTask from "../usecases/task/UpdateTask";
import { CreateTaskDTO } from "./dto/task";

export default abstract class TaskController {
  static async createTask(ctx: Context<CreateTaskDTO>) {
    const result = await CreateTask.execute(ctx.body!, ctx.ctxParams!["id"]);
    ctx.respond(ctx.ctx, "task created", 201, result);
  }

  static async updateTask(ctx: Context<CreateTaskDTO>) {
    const taskID = ctx.query!["id"];
    if (!taskID) throw new BaseError("task id is required", 400);
    const result = await UpdateTask.execute(
      ctx.body!,
      ctx.ctxParams!["id"],
      taskID
    );
    ctx.respond(ctx.ctx, "task updated", 201, result);
  }
}
