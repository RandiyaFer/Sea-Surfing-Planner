// UserSignUpValidationHandler.ts
import { User } from '../model/entities/user-entity';
import { ValidationHandler } from './validationHandler';
import { UserNameHandler } from './concreteHandlers/userNameHandler';
import { EmailHandler } from './concreteHandlers/emailHandler';
import { PhoneNumberHandler } from './concreteHandlers/phoneNumberHandler';
import { Context } from '../context';
import { PhoneVerifiedHandler } from './concreteHandlers/phoneVerifiedHandler';
import { EmailVerifiedHandler } from './concreteHandlers/emailVerifiedHandler';
// import { UserRoleHandler } from './concreteHandlers/userRoleHandler';
// import { UserAuthHandler } from './concreteHandlers/userAuthHandler';


export class UserSignUpValidationHandler implements ValidationHandler<User> {
  static handle(user: string | import("jsonwebtoken").JwtPayload): string | PromiseLike<string> {
    throw new Error('Method not implemented.');
  }
  readonly context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  setNext(handler: ValidationHandler<User>): ValidationHandler<User> {
    throw new Error('Method not implemented.');
  } 

  async handle(user: User): Promise<string | null> {
    // Validate all fields one by one
    const userNameHandler:UserNameHandler = new UserNameHandler();
    const phoneVerifiedHandler:PhoneVerifiedHandler = new PhoneVerifiedHandler();
    const emailVerifiedHandler:EmailVerifiedHandler = new EmailVerifiedHandler();
    // const userRoleHandler :UserRoleHandler = new UserRoleHandler();
    // const userAuthHandler :UserAuthHandler = new UserAuthHandler();
    const emailHandler :EmailHandler = new EmailHandler(this.context);
    const phoneHandler:PhoneNumberHandler = new PhoneNumberHandler(this.context);
    // Chain the handlers
    userNameHandler
      .setNext(emailHandler)
      .setNext(phoneHandler)
      .setNext(phoneVerifiedHandler)
      .setNext(emailVerifiedHandler)
      // .setNext(userRoleHandler)
      // .setNext(userAuthHandler)

    // Start validation
    return  await userNameHandler.handleValidation(user);
  }

  async handleValidation(_user: User): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
}
