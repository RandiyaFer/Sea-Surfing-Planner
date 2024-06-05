import { Context } from '../../context';
import { User } from '../../model/entities/user-entity';

export class UserValidation {
  constructor(readonly context: Context) {
  }
  async userSignUpValidation(user:User):Promise<string[]>{
    let errors: string[] = [];
    // Check if userName is provided and not empty
    if (!user.userName || user.userName.trim() === '') errors.push('User name is required');
    // Check if email is provided and already taken or not
    if (!user.email) errors.push('Email is required');
    else if(!await this.context.userRepository.checkEmailValidity(user.email)) errors.push('This email address is already in use');
    // Check if phone1 is provided and has a valid format
    if (!user.phoneNumber1) errors.push('Phone number is required ');
    else if(!await this.context.userRepository.checkPhoneNumberValidity(user.phoneNumber1)) errors.push('This phone number is already in use');
    // Check if phoneVerified is provided and is a valid number (0 or 1)
    if (user.phoneVerified !== 0 && user.phoneVerified !== 1) errors.push('Phone verification status must be either 0 or 1');
    // Check if emailVerified is provided and is a valid number (0 or 1)
    if (user.emailVerified !== 0 && user.emailVerified !== 1) errors.push('Email verification status must be either 0 or 1');
    // // Validate userRole
    // if (!user.userRole) errors.push('User role is required'); 
    // else if (!user.userRole.roleName || user.userRole.roleName.trim() === '') errors.push('User role name is required');
    // // Validate userAuth
    // if (!user.userAuth) errors.push('User authentication data is required');
    // else {
    //   if (!user.userAuth.expiryTimestamp || user.userAuth.expiryTimestamp.trim() === '') errors.push('User expiry time stamp  is required');
    //   if (!user.userAuth.authToken || user.userAuth.authToken.trim() === '') errors.push('User authentication token is required');
    // }
    // // Validate userCountry
    // if (!user.userCountry) errors.push('User country is required');
    // else if (!user.userCountry.country || user.userCountry.country.trim() === '') errors.push('User country is required');
     return errors;
  }

  async userSignInValidation(email:string):Promise<string[]>{
    let errors: string[] = [];

    if (!email) errors.push('Email is required');
    else if(await this.context.userRepository.checkEmailValidity(email)) errors.push('User Email not valid. PLease sign-up');
    return errors;
  }
}

