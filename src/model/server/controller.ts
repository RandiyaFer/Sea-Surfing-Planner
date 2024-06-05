import { Router, RouterOptions } from 'express';
import { ErrorCode } from '../response/error-code';
import { BaseEntity } from '../entities/base-entity';
import { surfyResponse } from '../response/surfy-response';

export const defaultRouterOptions: RouterOptions = {
  caseSensitive: true,
  mergeParams: false,
  strict: true
};

export abstract class AbstractController {
  readonly router = Router(this.routerOptions);

  protected constructor(readonly routerOptions = defaultRouterOptions) {
  }

  protected buildResponse<T extends BaseEntity>(error: ErrorCode, message: string, entity: BaseEntity[] | undefined) {
    return {
      status: error,
      message: message,
      data: entity
    } as surfyResponse<T[]>;
  }
}
