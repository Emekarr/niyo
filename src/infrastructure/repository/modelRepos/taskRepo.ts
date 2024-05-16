import { DefaultRepository } from "../index";
import { TaskModel, TaskSchema } from "../models/Task";

export default class TaskRepo extends DefaultRepository<TaskModel> {
  constructor() {
    super("Task", TaskSchema);
  }
}
