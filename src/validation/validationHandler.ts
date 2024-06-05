
export interface ValidationHandler<T> {
  setNext(handler: ValidationHandler<T>):ValidationHandler<T>;
  handle(user: T): Promise<string | null>;
  handleValidation(user: T): Promise<string | null>;
}

