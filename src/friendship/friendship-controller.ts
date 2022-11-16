import { Body, Controller, Post, Route } from 'tsoa';
import { FriendshipCreationParams, UndoFriendshipParams } from './friendship';
import { FriendshipService } from './friendship-service';

@Route('friendship')
export class FriendshipController extends Controller {
  @Post('/create')
  public async sendCreateFriendshipCommand(@Body() requestBody: FriendshipCreationParams): Promise<void> {
    await new FriendshipService().create(requestBody);
  }

  @Post('/undo')
  public async sendUndoFriendshipCommand(@Body() requestBody: UndoFriendshipParams): Promise<void> {
    await new FriendshipService().undo(requestBody);
  }
}
