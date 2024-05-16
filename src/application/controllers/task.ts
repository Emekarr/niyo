import { Context } from "../../entities/interfaces/Context";
import CreateTask from "../usecases/task/CreateTask";
import { CreateTaskDTO } from "./dto/task";

export default abstract class TaskController {
  static async createTask(ctx: Context<CreateTaskDTO>) {
    const result = await CreateTask.execute(ctx.body!, ctx.ctxParams!["id"]);
    ctx.respond(ctx.ctx, "task created", 201, result);
  }
}
