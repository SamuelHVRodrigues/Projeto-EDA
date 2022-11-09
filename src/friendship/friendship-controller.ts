import { Body, Controller, Post, Route } from 'tsoa';
import { FriendshipCreationParams } from './friendship';
import { FriendshipService } from './friendship-service';

@Route('friendship')
export class FriendshipController extends Controller {
  @Post()
  public async createFriendship(@Body() requestBody: FriendshipCreationParams): Promise<void> {
    await new FriendshipService().create(requestBody);
  }
}
