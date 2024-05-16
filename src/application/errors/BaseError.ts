export default class BaseError extends Error {
  constructor(
    public msg: string,
    public statusCode: number = 500,
    public escalate: boolean = false
  ) {
    super(msg);
  }
}
