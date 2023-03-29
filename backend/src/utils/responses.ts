import type { SuccessResponse, ErrorResponse } from 'types';

export const createSuccessResponse = <T>(data: T): SuccessResponse<T> => ({
  ok: true,
  data,
});

export const createErrorResponse = (
  errors: ErrorResponse['errors'],
): ErrorResponse => ({
  ok: false,
  errors,
});
