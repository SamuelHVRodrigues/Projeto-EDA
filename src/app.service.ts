import { bus } from './event-bus/event-bus';
import { HelloCommand } from './event-bus/hello-command';

export class Hello {
  public get(): string {
    bus.send(new HelloCommand());
    return 'Hello World!';
  }
}
