import { Context } from '../context';
import { AbstractController } from '../model/server/controller';
import { ApiController } from './api.controller';

export class RootController extends AbstractController {

  constructor(readonly context: Context) {
    super();

    this.router
      .use('/api', new ApiController(context).router);
  }
}
