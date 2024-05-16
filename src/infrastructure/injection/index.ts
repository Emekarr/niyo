import { container } from "tsyringe";
import WinstonLogger from "../logger/winston";
import JoiValidator from "../validator/joi";
import UserRepo from "../repository/modelRepos/userRepo";
import cryptography from "../cryptography";

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

  container.register("HasherInterface", {
    useClass: cryptography.defaultHasher,
  });

  container.register("JWTGeneratorInterface", {
    useClass: cryptography.defaultTokenGenerator,
  });
};
