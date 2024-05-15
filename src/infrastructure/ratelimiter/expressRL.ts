import rateLimiter, { Options } from "express-rate-limit";

import { RateLimiterInterface } from "./types";

class RateLimiter implements RateLimiterInterface {
  init<T>(timeFrame: number, maxRequests: number, opts: Partial<T>) {
    return rateLimiter({
      windowMs: timeFrame,
      max: maxRequests,
      ...opts,
    });
  }
}

export default Object.freeze(new RateLimiter());
