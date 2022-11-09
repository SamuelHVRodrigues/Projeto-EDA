import { CreateFriendshipCommand } from '../event-bus/create-friendship/create-friendship-command';
import { bus } from '../event-bus';
import { FriendshipCreationParams } from './friendship';

export class FriendshipService {
  public async create(friendshipCreationParams: FriendshipCreationParams): Promise<void> {
    await bus.send(new CreateFriendshipCommand(friendshipCreationParams));
  }
}
