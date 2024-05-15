import { container } from "tsyringe";
import WinstonLogger from "../logger/winston";

export const registerDependencies = () => {
  container.register("LoggerInterface", {
    useClass: WinstonLogger,
  });
};
