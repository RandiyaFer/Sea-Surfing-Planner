import { User } from '../../model/entities/user-entity';
import { BaseValidationHandler } from '../baseHandler/baseValidationHandler';

// export class UserAuthHandler extends BaseValidationHandler<User> {
//   // async handle(user: User): Promise<string | null> {
//   //   if (!user.userAuth) {
//   //     return 'User authentication data is required';
//   //   } else {
//   //     if (!user.userAuth.expiryTimestamp || user.userAuth.expiryTimestamp.trim() === '') return 'User expiry timestamp is required';
//   //     if (!user.userAuth.authToken || user.userAuth.authToken.trim() === '') return 'User authentication token is required';
//   //     if (!user.password) return 'User Password is required';
//   //   }
//   //   return null;
//   // }
// }
