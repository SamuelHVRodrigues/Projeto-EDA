import { handlerFor } from '@node-ts/bus-core';
import { session } from '../../neo4j';
import { UndoFriendshipCommand } from './undo-friendship-command';

export const undoFriendshipHandler = handlerFor(UndoFriendshipCommand, undoFriendship);

export async function undoFriendship(command) {
  await session.run(
    `MATCH (user:USER) -[rel:FRIENDS_TO]- (friend:USER)
      WHERE user.id = $input.userId1 AND friend.id = $input.userId2
      DELETE rel`,
    { input: command.undoFriendshipParams },
  );
}
