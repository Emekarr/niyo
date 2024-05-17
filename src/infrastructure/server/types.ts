import { SocketEvent } from "../../entities/events";

export interface ServerInterface {
  start(): any;
}

export interface WebSocketInterface {
  emit(event: SocketEvent, payload: any): void;
}
