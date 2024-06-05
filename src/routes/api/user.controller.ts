import express, { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { AbstractController } from '../../model/server/controller';
import { Context } from '../../context';
import { ErrorCode } from '../../model/response/error-code';

dotenv.config();

const router = express.Router();

let refreshTokens: string[] = [];

export class UserController extends AbstractController{
  private SUCCESS_SERVER_DATA_MSG: string = 'Successfully processed request to get User data';
  private FAILED_SERVER_DATA_MSG: string = 'Error occurred while processing request to get User data';
  private SUCCESS_SESSION_DATA_MSG: string = 'Succesfully user login before session expired';
  private FAILED_SESSION_DATA_MSG: string = 'Session Expired';
  private SUCCESS_LOGOUT_DATA_MSG: string = 'Succesfully user logout';
  private FAILED_LOGOUT_DATA_MSG: string = 'Error occurred while logout, Looks like user not logged';

constructor(private readonly context: Context) {
  super();
  this.router
    // .get('/', this.retrieveUser.bind(this))
    .post('/', this.insertUser.bind(this))
    // .post('/login', this.login.bind(this))
    // .get('/check-email-validity/:email', this.checkEmailValidity.bind(this))
    // .get('/check', this.checkUser.bind(this))
    // .get('/logout', this.logOut.bind(this))
    // .post('/sign-in', this.checkEmailAndPasswordForSignIn.bind(this))
    // .get('/check-phone-number-validity/:phoneNumber', this.checkPhoneNumberValidity.bind(this))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    // .use(cookieParser())
    // .use(session({ secret: 'RomifyS', resave: false, saveUninitialized: false, cookie: { secure: true } }));
}

 // ------------------ Add new User ( Sign up ) ------------------ //
 private async insertUser(req: Request, res: Response): Promise<void> {
  try {
    console.log('Received request to insert new user');
    // Decode JWT
    // let user = jwt.verify(req.body.token, 'Romify');
    let user = req.body;
    // Perform validation
    const validationError = await this.context.signUpValidator.handle(user);
    if (validationError) {
      res.status(ErrorCode.BAD_REQUEST).send({ status: ErrorCode.BAD_REQUEST, message: 'Bad Request ', error: validationError });
      return;
    }
    // Hash the password before saving
    // if (user && user.userAuth && user.password) user.password = await bcrypt.hash(user.password, 10);
    // Insert User data to DB
    await this.context.userRepository.insertUser(user);
    this.context.logger.info(this.SUCCESS_SERVER_DATA_MSG);

    res.status(ErrorCode.CREATED.valueOf()).send(super.buildResponse(ErrorCode.CREATED, this.SUCCESS_SERVER_DATA_MSG, user));
  } catch (err) {
    console.log(err);
    this.context.logger.info(err);
    this.context.logger.info(this.FAILED_SERVER_DATA_MSG);
    res.status(ErrorCode.INTERNAL_SERVER_ERROR.valueOf()).send(super.buildResponse(ErrorCode.INTERNAL_SERVER_ERROR, this.FAILED_SERVER_DATA_MSG, undefined));
  }
}
}
