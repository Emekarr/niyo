import { registerDependencies } from "./injection";
import DefaultServer from "./server";
import ServerInterface from "./types";

export const startServer = (server: ServerInterface) => {
  return server.start();
};

export const startServices = () => {
  registerDependencies();
};

export default () => {
  startServices();
  return startServer(DefaultServer);
};
