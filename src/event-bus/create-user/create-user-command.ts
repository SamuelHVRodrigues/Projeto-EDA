import { Command } from '@node-ts/bus-messages';
import { UserCreationParams } from '../../users/user';

export class CreateUserCommand extends Command {
  $name = 'createUser';
  $version = 0;

  constructor(public userCreationParams: UserCreationParams) {
    super();
  }
}
