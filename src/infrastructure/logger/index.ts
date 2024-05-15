import { LoggerInterface } from "./types";
import WinstonLogger from "./winston";

const defaultLogger: LoggerInterface = new WinstonLogger();

export default defaultLogger;
