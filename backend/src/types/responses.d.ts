import type { ValidationError } from 'express-validator';

interface DefaultResponse {
  ok: boolean;
}

interface ErrorResponse extends DefaultResponse {
  ok: false;
  errors: Array<string> | Record<string, ValidationError>;
}

interface SuccessResponse<T> extends DefaultResponse {
  ok: true;
  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
