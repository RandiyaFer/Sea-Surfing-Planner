// Base class for validation handlers
import { ValidationHandler } from '../validationHandler';
import { User } from '../../model/entities/user-entity';

export abstract class BaseValidationHandler<T> implements ValidationHandler<T> {
  protected nextHandler: ValidationHandler<T> | null = null;

  setNext(handler: ValidationHandler<T>): ValidationHandler<T> {
    this.nextHandler = handler;
    return handler;
  }

  abstract handle(user: T): Promise<string | null>;

  async handleValidation(user: T): Promise<string | null> {
    const result = await this.handle(user);
    if (result === null && this.nextHandler !== null) {
      return await this.nextHandler.handleValidation(user); // Wait for the result of the next handler
    }
    return result;
  }
}
