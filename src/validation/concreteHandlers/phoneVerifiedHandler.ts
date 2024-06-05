import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';

export class PhoneVerifiedHandler extends BaseValidationHandler<User> {
  async handle(user: User): Promise<string | null> {
    if (user.phoneVerified !== 0 && user.phoneVerified !== 1) return 'Phone verification status must be either 0 or 1';
    return null;
  }
}
