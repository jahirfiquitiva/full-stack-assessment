import type { ValidationError } from 'express-validator';

interface DefaultResponse {
  ok: boolean;
}

interface ErrorResponse extends DefaultResponse {
  ok: false;
  errors: string | Array<string>;
}

interface PaginatedData {
  page?: number;
  limit?: number;
  count?: number;
}

interface SuccessResponse<T> extends DefaultResponse, PaginatedData {
  ok: true;
  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
