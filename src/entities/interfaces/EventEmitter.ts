import { EventArgs } from "../../infrastructure/eventEmitter";
import { SocketEvent } from "../events";

export default interface EventEmitterInterface {
  emitEvent(event: SocketEvent, args: EventArgs): void;
  registerListener(event: SocketEvent, cb: (args: EventArgs) => void): void;
}
