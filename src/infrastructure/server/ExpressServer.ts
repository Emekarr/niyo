import { registerDependencies } from "../injection";
registerDependencies();
import ServerInterface from "../types";
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
import { ErrorMiddleware } from "../../application/middleware/error";
import { HeadersMiddleware } from "../../application/middleware/headers";

export default class ExpressServer implements ServerInterface {
  start(): any {
    const server = express();

    server.use(morgan("combined"));
    server.use(helmet());

    // rate limiter
    server.use(
      RateLimiter.init<Options>(10 * 60 * 1000, 3000, {
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

    server.use(HeadersMiddleware);

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
      server.listen(config.getPort(), () => {
        Logger.instance.write(
          LoggerLevel.info,
          `server running on PORT ${config.getPort()}`
        );
      });
    }

    return server;
  }
}
