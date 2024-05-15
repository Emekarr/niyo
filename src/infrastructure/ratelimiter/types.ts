export interface RateLimiterInterface {
  init<T>(timeFrame: number, maxRequests: number, opts: Partial<T>): any;
}
