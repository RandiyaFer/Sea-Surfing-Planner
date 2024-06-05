import { User } from '../model/entities/user-entity';
// import { UserRole } from '../models/entities/user-role';
// import { UserCountry } from '../models/entities/user-country';

export interface IUserRepository {
//   retrieveUser(): Promise<User[]>;
  insertUser(user: User):Promise<void>;
  checkEmailValidity(email: string): Promise<boolean>;
  checkPhoneNumberValidity(phoneNumber: string): Promise<boolean>;
  findUserById(id:number):Promise<User>;
  findUserByEmail(email:string): Promise<User>;
//   findUserRoleById(id:number):Promise<UserRole>;
//   findUserCountryById(id:number):Promise<UserCountry>;
  checkEmailAndPasswordForSignIn(email: string, password: string):Promise<User[][]>;
}