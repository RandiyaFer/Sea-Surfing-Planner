import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';


export class passwordHandler<T> extends BaseValidationHandler<T> {
  async handle(user: User| any): Promise<string | null> {
    if ((!user.userAuth.password || user.userAuth.password.trim() === '') || (!user.password ||  user.password.trim() === '' )) return 'Password is required';
    return null;
  }
}
