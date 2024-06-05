import { AbstractController } from '../model/server/controller';
import { Context } from '../context';
import { Request, Response } from 'express';
import { UserController } from './api/user.controller';

export class ApiController extends AbstractController {

  constructor(readonly context: Context) {
    super();

    this.router
      .use('/user', new UserController(context).router)
    // define other controllers here. eg: .use('/customer', new CustomerController(context).router)
  }


}
