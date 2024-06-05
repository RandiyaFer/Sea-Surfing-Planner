import { ErrorCode } from './error-code';

export interface surfyResponse<T> {
  status: ErrorCode;
  message: string;
  data: T;
}
