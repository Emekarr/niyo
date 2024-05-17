import { initiateDBConnection } from "./database";
import DefaultServer from "./server";
import { ServerInterface } from "./server/types";

export const startServer = (server: ServerInterface) => {
  return server.start();
};

export const startServices = () => {
  initiateDBConnection();
};

export default () => {
  startServices();
  return startServer(DefaultServer);
};
