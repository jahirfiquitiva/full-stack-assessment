interface ErrorResponse {
  ok: false;
  errors: string | Array<string>;
}

interface SuccessResponse<T> {
  ok: true;
  data: T;
  count?: number;
}

export type BackendResponse<T> = SuccessResponse<T> | ErrorResponse;
