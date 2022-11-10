import { Bus, BusInstance } from '@node-ts/bus-core';
import { createUserHandler } from './create-user-handler';
import { helloHandler } from './helllo-handler';

export let bus: BusInstance;
export async function startBus() {
  const configure = Bus.configure();
  configure.withHandler(helloHandler);
  configure.withHandler(createUserHandler);

  bus = await configure.initialize();

  await bus.start();
}
