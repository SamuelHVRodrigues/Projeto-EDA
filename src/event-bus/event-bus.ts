import { Bus, BusInstance } from '@node-ts/bus-core';
import { helloHandler } from './helllo-handler';

export let bus: BusInstance;
export async function startBus() {
  const configure = Bus.configure().withHandler(helloHandler);
  bus = await configure.initialize();

  await bus.start();
}
