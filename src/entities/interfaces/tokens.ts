import { InjectionToken } from "tsyringe";
import { LoggerInterface } from "../../application/loggers/types";

export const LOGGER_INJECTION_TOKEN: InjectionToken<LoggerInterface> =
  "LoggerInterface";
