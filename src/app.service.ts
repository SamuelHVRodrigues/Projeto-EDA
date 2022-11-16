import { bus } from './event-bus';
import { HelloCommand } from './event-bus/hello/hello-command';

export class Hello {
  public get(): string {
    bus.send(new HelloCommand());
    return 'Hello World!';
  }
}
