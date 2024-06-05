import { Config, EnvName } from './config';
// import { Db, dbConnectionConfigFactory } from './models/server/db';
import { loggerFactory } from './logger/logger';
// import { ServerDataRepositoryMssql } from './repositories/mssql';
// import { UserAuthRepositoryMssql } from './repositories/mssql/user-auth.mssql';
import { UserRepositoryMssql } from './repositories/mssql/user.mssql';
import { IUserRepository } from './repositories/user';
// import { IUserAuthRepository } from './repositories/user-auth';
// import { IServerDataRepository } from './repositories/server-data';
// import { IUserRoleRepository } from './repositories/user-role';
// import { UserRoleRepositoryMssql } from './repositories/mssql/user-role.mssql';
// import { IUserCountryRepository } from './repositories/user-country';
// import { UserCountryRepositoryMssql } from './repositories/mssql/user-country.mssql';
import { UserSignUpValidationHandler } from './validation/userSignUpValidationHandler';
import { UserValidation } from './utils/validation/userValidation';
// import { ICurrencyRepository } from './repositories/currency';
// import { CurrencyRepositoryMssql } from './repositories/mssql/currency.mssql';

export class Context {
   readonly logger = loggerFactory(this.config);

  // readonly db = new Db(dbConnectionConfigFactory(this.config));

  // Repo
  // readonly serverDataRepository : IServerDataRepository = new ServerDataRepositoryMssql(this);
  readonly userRepository : IUserRepository = new UserRepositoryMssql(this);
  // readonly userAuthRepository : IUserAuthRepository = new UserAuthRepositoryMssql(this);
  // readonly userRoleRepository: IUserRoleRepository = new UserRoleRepositoryMssql(this);
  // readonly userCountryRepository : IUserCountryRepository = new UserCountryRepositoryMssql(this);
  // readonly currencyRepository : ICurrencyRepository = new CurrencyRepositoryMssql(this);


  // Validation
  readonly signUpValidator:UserSignUpValidationHandler = new UserSignUpValidationHandler(this);
  readonly userValidation = new UserValidation(this);
  constructor(readonly config: Config) {
    // addApplicationInsightsLogger(config);
   }

  get envName(): EnvName {
    return this.config?.env?.name;
  }
}


// function addApplicationInsightsLogger(config: Config) {
//   throw new Error('Function not implemented.');
// }
export function contextFactory(config: Config): Context {
  return new Context(config);
}
