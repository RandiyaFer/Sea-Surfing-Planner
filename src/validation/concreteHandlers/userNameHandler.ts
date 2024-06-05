import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';


export class UserNameHandler extends BaseValidationHandler<User> {
  async handle(user: User): Promise<string | null> {
    if (!user.userName || user.userName.trim() === '') return 'User name is required';
    return null;
  }
}
