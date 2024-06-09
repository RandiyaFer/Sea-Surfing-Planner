// import { UserAuthRepositoryMssql } from './repositories/mssql/user-auth.mssql';
import { UserRepositoryMssql } from './repositories/mssql/user.mssql';
import { IUserRepository } from './repositories/user';
import { UserSignUpValidationHandler } from './validation/userSignUpValidationHandler';
import { UserValidation } from './utils/validation/userValidation';
// import { IUserAuthRepository } from './repositories/user-auth';

export class Context {

  // Repo
  readonly userRepository : IUserRepository = new UserRepositoryMssql(this);


  // Validation
  readonly signUpValidator:UserSignUpValidationHandler = new UserSignUpValidationHandler(this);
  readonly userValidation = new UserValidation(this);
}
