import { container, inject, injectable, singleton } from "tsyringe";
import EventEmitterInterface from "../../entities/interfaces/EventEmitter";

@injectable()
@singleton()
class EventEmitter {
  constructor(
    @inject("EventEmitterInterface") public instance: EventEmitterInterface
  ) {}
}

export default container.resolve(EventEmitter);
