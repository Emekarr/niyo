import { Context } from "../../entities/interfaces/Context";
import BaseError from "../errors/BaseError";
import taskRepo from "../repository/taskRepo";
import CreateTask from "../usecases/task/CreateTask";
import DeleteTask from "../usecases/task/DeleteTask";
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
    ctx.respond(ctx.ctx, "task updated", 200, result);
  }

  static async deleteTask(ctx: Context<CreateTaskDTO>) {
    const taskID = ctx.query!["id"];
    if (!taskID) throw new BaseError("task id is required", 400);
    const result = await DeleteTask.execute(ctx.ctxParams!["id"], taskID);
    ctx.respond(ctx.ctx, "task deleted", 200, result);
  }

  static async getTasks(ctx: Context<any>) {
    const limit = ctx.query!["limit"];
    const lastID = ctx.query!["lastID"];
    const result = await taskRepo.instance.list({
      conditions: {
        userID: ctx.ctxParams!["id"],
        _id: (function (): object {
          if (!lastID) {
            return {
              $gt: "",
            };
          }
          return {
            $gt: lastID,
          };
        })(),
      },
      limit: Number(limit),
      sort: "-_id",
    });
    ctx.respond(ctx.ctx, "tasks fetched", 200, result);
  }
}
