import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';

export class EmailVerifiedHandler extends BaseValidationHandler<User> {
  async handle(user: User): Promise<string | null> {
    if (user.emailVerified !== 0 && user.emailVerified !== 1) return 'Email verification status must be either 0 or 1';
    return null;
  }
}
