import { Controller, Get, Route } from 'tsoa';
import { Hello } from './app.service';

@Route()
export class UsersController extends Controller {
  @Get()
  public async getHello(): Promise<string> {
    return new Hello().get();
  }
}
