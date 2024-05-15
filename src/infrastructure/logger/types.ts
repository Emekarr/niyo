import { LoggerLevel, MetaData } from "../../application/loggers/types";

export interface LoggerInterface {
  write(level: LoggerLevel, msg: string, ...meta: MetaData[]): void;
}
