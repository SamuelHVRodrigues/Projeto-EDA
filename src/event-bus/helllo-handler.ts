import { handlerFor } from '@node-ts/bus-core';
import { HelloCommand } from './hello-command';

export const helloHandler = handlerFor(HelloCommand, (command) => {
  console.log('Hello World!');
});
