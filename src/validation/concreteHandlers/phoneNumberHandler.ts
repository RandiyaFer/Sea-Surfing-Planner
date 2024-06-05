import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';
import { Context } from '../../context';

export class PhoneNumberHandler extends BaseValidationHandler<User> {
  constructor(private context: Context) {
    super();
  }

  async handle(user: User): Promise<string | null> {
    if (!user.phoneNumber1) return 'Phone number is required';
    if (!await this.context.userRepository.checkPhoneNumberValidity(user.phoneNumber1)) return 'This phone number is already in use';
    return null;
  }
}
 