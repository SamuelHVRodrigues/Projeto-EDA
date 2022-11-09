import { Command } from '@node-ts/bus-messages';

export class HelloCommand extends Command {
  $name = 'hello';
  $version = 0;

  constructor() {
    super();
  }
}
