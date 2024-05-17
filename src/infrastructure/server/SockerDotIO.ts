import { Server, Socket, Namespace } from "socket.io";
import { WebSocketInterface } from "./types";
import { Server as HTTPServer } from "http";
import Logger from "../../application/loggers/Logger";
import { LoggerLevel } from "../../application/loggers/types";
import BaseError from "../../application/errors/BaseError";
import jwtGenerator from "../../application/cryptography/jwtGenerator";
import userRepo from "../../application/repository/userRepo";
import { EventArgs } from "../eventEmitter";
import { SocketEvent } from "../../entities/events";
import eventEmitter from "../../application/eventEmitter";

export default class SocketDotIO implements WebSocketInterface {
  public ioInstance: Server;
  private CONNECTION_NAMESPACE = "/socket/connect";
  private connectionNS: Namespace;
  // handle active connections in this array to avoid complexity of introducing caches
  // in a production enviornment redis will be the favoured choice for managing these connections
  private connections: Socket[] = [];

  constructor(server: HTTPServer) {
    this.ioInstance = new Server(server);
    this.connectionNS = this.ioInstance.of(this.CONNECTION_NAMESPACE);

    this.connectionNS.use(async (socket, next) => {
      try {
        const token = socket.request.headers["authorization"];
        const deviceID = socket.request.headers["x-device-id"];
        const appVersion = socket.request.headers["x-app-version"];
        const userAgent = socket.request.headers["user-agent"];
        if (!token) {
          return next(new BaseError("authentication failed", 401));
        }
        const payload = jwtGenerator.instance.verify(token);
        // makes sure user is still valid and up to date details are used
        const user = await userRepo.instance.findOne({
          email: payload.email,
        });
        if (!user) throw new BaseError("user does not exist", 404);
        if (
          user.appVersion !== payload.appVersion ||
          user.appVersion != appVersion
        ) {
          // this should trigger an account lock and force the user to
          // verify his identity before a token can be generated
          next(new BaseError("authentication failed", 401));
        }
        if (
          user.userAgent !== payload.userAgent ||
          user.userAgent !== userAgent
        ) {
          // this should trigger an account lock and force the user to
          // verify his identity before a token can be generated
          next(new BaseError("authentication failed", 401));
        }
        if (user.deviceID !== payload.deviceID || user.deviceID !== deviceID) {
          // this should trigger an account lock and force the user to
          // verify his identity before a token can be generated
          next(new BaseError("authentication failed", 401));
        }
        next();
      } catch (err: any) {
        Logger.instance.write(
          LoggerLevel.error,
          "could not establish socket connection",
          {
            key: "error",

            data: err,
          }
        );
        next(err);
      }
    });

    this.connectionNS.on("connection", (socket) => {
      Logger.instance.write(LoggerLevel.info, "new socket connection", {
        key: "id",
        data: socket.id,
      });
      this.connections.push(socket);

      socket.on("disconnect", () => {
        Logger.instance.write(LoggerLevel.info, "socket connection ended", {
          key: "id",
          data: socket.id,
        });
        this.connections = this.connections.filter((connection) => {
          connection.id !== socket.id;
        });
      });
    });
  }

  emit(event: SocketEvent, payload: any) {
    this.connectionNS.emit(event, payload);
  }

  registerLocalListener(event: SocketEvent) {
    eventEmitter.instance.registerListener(event, (args: EventArgs) => {
      this.connectionNS.emit(args.channel, args.data);
    });
    return this;
  }
}
