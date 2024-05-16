import { container, inject, injectable, singleton } from "tsyringe";
import { Repository } from "../../infrastructure/repository/type";
import Task from "../../entities/domain/Task";

@injectable()
@singleton()
class TaskRepository {
  constructor(@inject("TaskRepo") public instance: Repository<Task>) {}
}

export default container.resolve(TaskRepository);
