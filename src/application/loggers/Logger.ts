import { container, inject, injectable, singleton } from "tsyringe";
import { LoggerInterface } from "./types";

@injectable()
@singleton()
export class Logger {
  constructor(@inject("LoggerInterface") public instance: LoggerInterface) {}
}

export default container.resolve(Logger);
