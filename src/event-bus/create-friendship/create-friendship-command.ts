import { Command } from '@node-ts/bus-messages';
import { FriendshipCreationParams } from '../../friendship/friendship';

export class CreateFriendshipCommand extends Command {
  $name = 'createFriendship';
  $version = 0;

  constructor(public friendshipCreationParams: FriendshipCreationParams) {
    super();
  }
}
