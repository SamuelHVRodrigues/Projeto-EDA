import { CreateFriendshipCommand } from '../event-bus/create-friendship/create-friendship-command';
import { bus } from '../event-bus';
import { FriendshipCreationParams, UndoFriendshipParams } from './friendship';
import { UndoFriendshipCommand } from '../event-bus/undo-friendship/undo-friendship-command';

export class FriendshipService {
  public async create(friendshipCreationParams: FriendshipCreationParams): Promise<void> {
    await bus.send(new CreateFriendshipCommand(friendshipCreationParams));
  }

  public async undo(undoFriendshipParams: UndoFriendshipParams): Promise<void> {
    await bus.send(new UndoFriendshipCommand(undoFriendshipParams));
  }
}
