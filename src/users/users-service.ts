import { CreateUserCommand } from '../event-bus/create-user-command';
import { bus } from '../event-bus/event-bus';
import { UserCreationParams } from './user';

export class UsersService {
  public async create(userCreationParams: UserCreationParams): Promise<void> {
    await bus.send(new CreateUserCommand(userCreationParams));
  }
}
