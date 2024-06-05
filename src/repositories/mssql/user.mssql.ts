import { Context } from '../../context';
import { User } from '../../model/entities/user-entity';
import { IUserRepository } from '../user';
// import { UserRole } from '../../models/entities/user-role';
// import { UserCountry } from '../../models/entities/user-country';
// import { Currency } from '../../models/entities/currency';
import { TYPES } from 'tedious';
import bcrypt from 'bcrypt';


export class UserRepositoryMssql implements IUserRepository {
  constructor(readonly context: Context) {
  }
  insertUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  checkEmailValidity(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  checkPhoneNumberValidity(phoneNumber: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findUserById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  checkEmailAndPasswordForSignIn(email: string, password: string): Promise<User[][]> {
    throw new Error('Method not implemented.');
  }

//   // ------------------ Get ALL Users ------------------ //
//   async retrieveUser(): Promise<User[]> {
//     const query:string = 'SELECT u.ID AS UserID,ur.ID AS UserRoleID,ur.ROLE_NAME AS UserRoleName,ur.ROLE_DESC AS UserRoleDesc,ur.ADDED_TIME AS UserRoleAddedTime,' + `
//                         ur.MODIFIED_TIME AS UserRoleModifiedTime,
//                         ur.ADDED_BY AS UserRoleAddedBy,
//                         ur.MODIFIED_BY AS UserRoleModifiedBy,
//                         uc.ID AS UserCountryID,
//                         uc.COUNTRY AS UserCountryName,
//                         uc.ID_CARD_TYPE AS UserCountryIDCardType,
//                         uc.ADDED_TIME AS UserCountryAddedTime,
//                         uc.MODIFIED_TIME AS UserCountryModifiedTime,
//                         uc.ADDED_BY AS UserCountryAddedBy,
//                         uc.MODIFIED_BY AS UserCountryModifiedBy,
//                         c.ID AS CurrencyID,
//                         c.CURRENCY_NAME AS CurrencyName,
//                         c.ADDED_TIME AS CurrencyAddedTime,
//                         c.MODIFIED_TIME AS CurrencyModifiedTime,
//                         c.ADDED_BY AS CurrencyAddedBy,
//                         c.MODIFIED_BY AS CurrencyModifiedBy,
//                         u.USER_NAME AS UserName,
//                         u.EMAIL AS Email,
//                         u.ADDRESS_1 AS Address1,
//                         u.ADDRESS_2 AS Address2,
//                         u.CITY AS City,
//                         u.LOCAL_ID_NO AS LocalIDNo,
//                         u.PASSPORT_NO AS PassportNo,
//                         u.ZIP_CODE AS ZipCode,
//                         u.PHONE_1 AS Phone1,
//                         u.PHONE_2 AS Phone2,
//                         u.PHONE_VERIFIED AS PhoneVerified,
//                         u.EMAIL_VERIFIED AS EmailVerified,
//                         u.IS_ACTIVE AS IsActive,
//                         u.PROFILE_PIC_URL AS ProfilePicURL
//                       FROM
//                         [dbo].[USER] u
//                         LEFT JOIN
//                         [dbo].[USER_ROLE] ur ON u.USER_ROLE_ID = ur.ID
//                         INNER JOIN
//                         [dbo].[USER_COUNTRY] uc ON u.USER_COUNTRY_ID = uc.ID
//                         INNER JOIN
//                         [dbo].[CURRENCY] c ON U.CURRENCY_ID = c.ID
//                         FOR JSON PATH;
// `;

//     const a:Promise<User[]> = this.context.db.executeQuery<User>(query);

//     try {
//       a.then(() => this.context.logger.info('Successfully retrieved user data from the database'));
//       return await a;
//     } catch (err) {
//       this.context.logger.info('Error retrieving user data from the database');
//       throw err;
//     }
//   }

  // // ------------------ Add new User ( Sign up ) ------------------ //
  // async insertUser(userData: User):Promise<void> {
  //   const spName: string = 'InsertUserData';
  //   const requestParams = [
  //     { name: 'Country', type: TYPES.NVarChar, value: userData.userCountry?.country },
  //     { name: 'IdCardType', type: TYPES.NVarChar, value: userData.userCountry?.idCardType || '' },
  //     { name: 'RoleName', type: TYPES.NVarChar, value: userData.userRole?.roleName },
  //     { name: 'RoleDesc', type: TYPES.NVarChar, value: userData.userRole?.roleDesc},
  //     { name: 'CurrencyName', type: TYPES.NVarChar, value: userData.currency?.currencyName},
  //     { name: 'UserName', type: TYPES.NVarChar, value: userData.userName },
  //     { name: 'Email', type: TYPES.NVarChar, value: userData.email },
  //     { name: 'Address1', type: TYPES.NVarChar, value: userData.address1 },
  //     { name: 'Address2', type: TYPES.NVarChar, value: userData.address2 },
  //     { name: 'City', type: TYPES.NVarChar, value: userData.city },
  //     { name: 'LocalIdNo', type: TYPES.NVarChar, value: userData.localIdNo },
  //     { name: 'PassportNo', type: TYPES.NVarChar, value: userData.passportNo },
  //     { name: 'ZipCode', type: TYPES.NVarChar, value: userData.zipCode },
  //     { name: 'Phone1', type: TYPES.VarChar, value: userData.phone1 },
  //     { name: 'Phone2', type: TYPES.VarChar, value: userData.phone2 },
  //     { name: 'PhoneVerified', type: TYPES.SmallInt, value: userData.phoneVerified },
  //     { name: 'EmailVerified', type: TYPES.SmallInt, value: userData.emailVerified },
  //     { name: 'IsActive', type: TYPES.SmallInt, value: userData.isActive || 1 },
  //     { name: 'ProfilePicUrl', type: TYPES.NVarChar, value: userData.profilePicUrl },
  //     { name: 'Password', type: TYPES.VarChar, value: userData.password },
  //     { name: 'AuthToken', type: TYPES.NVarChar, value: userData.userAuth?.authToken },
  //     { name: 'RefreshToken', type: TYPES.NVarChar, value: userData.userAuth?.refreshToken},
  //     { name: 'ExpiryTimestamp', type: TYPES.DateTime2, value: userData.userAuth?.expiryTimestamp },

  //   ];
  //   try {
  //     const result:any[] = await this.context.db.executeSP<any>(spName, requestParams);
  //     this.context.logger.info('Successfully inserted user data into the database');
  //   } catch (error) {
  //     this.context.logger.info(`Error inserting user data into the database`);
  //     throw error;
  //   }
  // }

  // // ------------------ Check Email Validity  ------------------ //
  // async checkEmailValidity(email: string): Promise<boolean> {
  //   const query: string = `
  //     SELECT CASE WHEN EXISTS (SELECT 1 FROM [dbo].[USER] WHERE EMAIL = '${email}')
  //     THEN 1
  //     ELSE 0
  //     END AS emailExists for JSON PATH ;`;

  //   try {
  //     const result:{ emailExists: number }[] = await this.context.db.executeQuery<{ emailExists: number }>(query);
  //     return result[0].emailExists !== 1;
  //   } catch (err) {
  //     this.context.logger.info('Error occurred while checking email validity');
  //     throw err;
  //   }
  // }

  // // ------------------ Check Phone Number Validity  ------------------ //
  // async checkPhoneNumberValidity(phoneNumber: string): Promise<boolean> {
  //   const query: string = `
  //     SELECT CASE WHEN EXISTS (SELECT 1 FROM [dbo].[USER] WHERE PHONE_1 = '${phoneNumber}')
  //      THEN 1
  //      ELSE 0
  //     END AS phoneNumberExists for JSON PATH ;`;

  //   try {
  //     const result:{ phoneNumberExists: number }[] = await this.context.db.executeQuery<{ phoneNumberExists: number }>(query);
  //     return result[0].phoneNumberExists !== 1;
  //   } catch (error) {
  //     this.context.logger.info(`Error checking phone number validity`);
  //     throw error;
  //   }
  // }

  // async findUserByEmail(email: string): Promise<User | undefined> {
  //   const query: string =
  //     `SELECT * FROM [dbo].[USER] WHERE EMAIL = '${email}'`;

  //   try {
  //     const users = await this.context.db.executeQuery<User>(query);
  //     return users[0];
  //   } catch (error) {
  //     this.context.logger.info(`Error finding user by email: ${error}`);
  //     throw error;
  //   }
  // }

  // async findUserById(id: number): Promise<User | undefined> {
  //   const query: string =
  //     `SELECT * FROM [dbo].[USER] WHERE ID = ${id}`;

  //   try {
  //     const users = await this.context.db.executeQuery<User>(query);
  //     return users[0];
  //   } catch (error) {
  //     this.context.logger.info(`Error finding user by ID: ${error}`);
  //     throw error;
  //   }
  // }

  // async findUserRoleById(id: number): Promise<UserRole | undefined> {
  //   const query: string =
  //     `SELECT * FROM [dbo].[USER_ROLE] WHERE ID = ${id}`;

  //   try {
  //     const roles = await this.context.db.executeQuery<UserRole>(query);
  //     return roles[0];
  //   } catch (error) {
  //     this.context.logger.info(`Error finding user role by ID: ${error}`);
  //     throw error;
  //   }
  // }
  // async findUserCountryById(id: number): Promise<UserCountry> {
  //   return;
  // }

  // -------------------- User Sign in -------------------------- //
  // async checkEmailAndPasswordForSignIn(email: string, password: string): Promise<User[][]> {
  //   try {
  //     const queryPassword: string = `SELECT [PASSWORD] FROM [dbo].[USER] WHERE [EMAIL] = '${email}' FOR JSON PATH;`;
  //     const queryUser: string = `SELECT * FROM [dbo].[USER] WHERE EMAIL = '${email}' FOR JSON PATH;`;

  //     // Fetch password from the database
  //     const dbPassword = await this.context.db.executeQuery<{ PASSWORD:  string}>(queryPassword);
  //     // Compare passwords using bcrypt
  //     const result = await new Promise<boolean>((resolve, reject) => {
  //       bcrypt.compare(password, dbPassword[0].PASSWORD, (err, result) => {
  //         if (err) reject(err);
  //         else resolve(result);
  //       });
  //     });

  //     if (result) {
  //       // Passwords match, fetch user details
  //       const user = await this.context.db.executeQuery<User[]>(queryUser);
  //       this.context.logger.info('Successfully signed in', JSON.stringify(user));
  //       return user;
  //     } else {
  //       // Passwords don't match
  //       this.context.logger.info(`Passwords Incorrect`);
  //       return [];
  //     }
  //   } catch (error) {
  //     this.context.logger.error(`Error checking sign-in: ${error}`);
  //     throw error;
  //   }
  // }

}
