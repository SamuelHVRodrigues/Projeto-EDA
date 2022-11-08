import { Body, Controller, Post, Route } from 'tsoa';
import { UserCreationParams } from './user';
import { UsersService } from './users-service';

@Route('users')
export class UsersController extends Controller {
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    await new UsersService().create(requestBody);
  }
}
