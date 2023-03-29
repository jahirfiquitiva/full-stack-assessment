import type { SuccessResponse, ErrorResponse, PaginatedData } from 'types';

export const createSuccessResponse = <T>(
  data: T,
  paginatedData?: PaginatedData,
): SuccessResponse<T> => ({
  ok: true,
  data,
  ...paginatedData,
});

export const createErrorResponse = (
  errors: ErrorResponse['errors'],
): ErrorResponse => ({
  ok: false,
  errors,
});
