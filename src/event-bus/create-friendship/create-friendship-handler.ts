import { handlerFor } from '@node-ts/bus-core';
import { session } from '../../neo4j';
import { CreateFriendshipCommand } from './create-friendship-command';

export const createFriendshipHandler = handlerFor(CreateFriendshipCommand, createFriendship);

export async function createFriendship(command) {
  await session.run(
    `MATCH (user:USER), (friend:USER)
      WHERE user.id = $input.userId1 AND friend.id = $input.userId2
      CREATE (user) -[:FRIENDS_TO]-> (friend)`,
    { input: command.friendshipCreationParams },
  );
}
