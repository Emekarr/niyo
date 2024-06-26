import { registerDependencies } from "../injection";
registerDependencies();
import { ServerInterface } from "./types";
import express from "express";
import morgan from "morgan";
import RateLimiter from "../ratelimiter";
import CORS from "../cors/defaultCORS";
import responder from ".././responder";
import config from "../../config";
import router from "../routes";
import helmet from "helmet";
import { Options } from "express-rate-limit";
import Logger from "../../application/loggers/Logger";
import { LoggerLevel } from "../../application/loggers/types";
import ErrorMiddleware from "../middleware/express/error";
import HeaderMiddleware from "../middleware/express/headers";
import AppVersionMiddleware from "../middleware/express/appVersion";
import SockerDotIO from "./SockerDotIO";

export default class ExpressServer implements ServerInterface {
  start(): any {
    const server = express();

    server.use(morgan("combined"));
    server.use(helmet());

    server.use(
      // in 1 minute 1 ip address can make a maximum of 25 requests after which they will be rate limited
      RateLimiter.init<Options>(60 * 1000, 25, {
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req, res) => {
          const clientIP = req.ip;
          if (!clientIP) throw new Error("required header missing");
          return clientIP;
        },
        handler: (req, res, next) => {
          responder.respond(
            res,
            "slow down! you have been rate limited",
            429,
            null
          );
          return;
        },
      })
    );

    server.use(
      CORS.init(config.getOrigins(), "GET,HEAD,PUT,PATCH,POST,DELETE", false, {
        credentials: true,
      })
    );

    server.use(express.json({ limit: config.getJSONLimit() }));

    server.use(
      express.urlencoded({ extended: true, limit: config.getJSONLimit() })
    );

    server.use(HeaderMiddleware);
    server.use(AppVersionMiddleware);

    server.use("/api", router.registerRoutes());

    server.use("/ping", (req, res, next) => {
      responder.respond(res, "pong", 200, null);
    });

    server.use("*", (req, res, next) => {
      responder.respond(
        res,
        `${req.method} ${req.baseUrl} does not exist`,
        404,
        null
      );
    });

    server.use(ErrorMiddleware);

    if (config.getNodeEnv() !== "test") {
      const httpServer = server.listen(config.getPort(), () => {
        Logger.instance.write(
          LoggerLevel.info,
          `server running on PORT ${config.getPort()}`
        );
      });
      new SockerDotIO(httpServer).registerLocalListener("SOCKET_EVENT");
    }

    return server;
  }
}
