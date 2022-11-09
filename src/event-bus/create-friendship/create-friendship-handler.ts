import { handlerFor } from '@node-ts/bus-core';
import { session } from '../../neo4j';
import { CreateFriendshipCommand } from './create-friendship-command';

export const createFriendshipHandler = handlerFor(CreateFriendshipCommand, createFriendship);

export async function createFriendship(command) {
  await session.run(
    `MATCH (user:USER), (friend:USER)
      WHERE user.id = $userId1 AND friend.id = $userId2
      CREATE (user) -[:FRIENDS_TO]-> (friend), (friend) -[:FRIENDS_TO]-> (user)`,
    {
      userId1: command.friendshipCreationParams.userId1,
      userId2: command.friendshipCreationParams.userId2,
    },
  );
}
