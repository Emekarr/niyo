import NodeEmitter from "node:events";
import EventEmitterInterface from "../../entities/interfaces/EventEmitter";

export interface EventArgs {
  channel: string;
  data: any;
}

export class EventEmitter extends NodeEmitter implements EventEmitterInterface {
  constructor() {
    super();
  }
  emitEvent(event: string, args: EventArgs) {
    this.emit(event, args);
  }

  registerListener(event: string, cb: (args: EventArgs) => void) {
    this.on(event, cb);
  }
}
