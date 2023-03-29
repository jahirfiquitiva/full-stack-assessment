import type { SuccessResponse, ErrorResponse } from 'types';

export const createSuccessResponse = <T>(
  data: T,
  page?: number,
  limit?: number,
): SuccessResponse<T> => ({
  ok: true,
  data,
  page,
  limit,
});

export const createErrorResponse = (
  errors: ErrorResponse['errors'],
): ErrorResponse => ({
  ok: false,
  errors,
});
