import { container } from "tsyringe";
import WinstonLogger from "../logger/winston";
import JoiValidator from "../validator/joi";
import UserRepo from "../repository/modelRepos/userRepo";
import cryptography from "../cryptography";
import TaskRepo from "../repository/modelRepos/taskRepo";
import { EventEmitter } from "../eventEmitter";

export const registerDependencies = () => {
  container.register("LoggerInterface", {
    useClass: WinstonLogger,
  });

  container.register("ValidatorInterface", {
    useClass: JoiValidator,
  });

  container.register("UserRepo", {
    useClass: UserRepo,
  });

  container.register("TaskRepo", {
    useClass: TaskRepo,
  });

  container.register("HasherInterface", {
    useClass: cryptography.defaultHasher,
  });

  container.register("JWTGeneratorInterface", {
    useClass: cryptography.defaultTokenGenerator,
  });

  container.register("EventEmitterInterface", {
    useClass: EventEmitter,
  });
};
