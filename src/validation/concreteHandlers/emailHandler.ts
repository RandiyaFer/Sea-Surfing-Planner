import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';
import { Context } from '../../context';

export class EmailHandler extends BaseValidationHandler<User> {
  constructor(private context: Context) {
    super();
  }

  async handle(user: User): Promise<string | null> {
    if (!user.email) return 'Email is required';
    if (!await this.context.userRepository.checkEmailValidity(user.email)) return 'This email address is already in use';
    return null;
  }
}
