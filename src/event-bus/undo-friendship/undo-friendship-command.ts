import { Command } from '@node-ts/bus-messages';
import { UndoFriendshipParams } from '../../friendship/friendship';

export class UndoFriendshipCommand extends Command {
  $name = 'undoFriendship';
  $version = 0;

  constructor(public undoFriendshipParams: UndoFriendshipParams) {
    super();
  }
}
