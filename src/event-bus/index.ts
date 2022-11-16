import { Bus, BusInstance } from '@node-ts/bus-core';
import { createFriendshipHandler } from './create-friendship/create-friendship-handler';
import { createUserHandler } from './create-user/create-user-handler';
import { helloHandler } from './hello/helllo-handler';
import { undoFriendshipHandler } from './undo-friendship/undo-friendship-handler';

export let bus: BusInstance;
export async function startBus() {
  const configure = Bus.configure();
  configure.withHandler(helloHandler);
  configure.withHandler(createUserHandler);
  configure.withHandler(createFriendshipHandler);
  configure.withHandler(undoFriendshipHandler);

  bus = await configure.initialize();

  await bus.start();
}
