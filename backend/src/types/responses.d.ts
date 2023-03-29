import type { ValidationError } from 'express-validator';

interface DefaultResponse {
  ok: boolean;
}

interface ErrorResponse extends DefaultResponse {
  ok: false;
  errors: string | Array<string> | Record<string, ValidationError>;
}

interface SuccessResponse<T> extends DefaultResponse {
  ok: true;
  data: T;
  page?: number;
  limit?: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
