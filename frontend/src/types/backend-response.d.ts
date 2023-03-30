interface ErrorResponse {
  ok: false;
  errors: string | Array<string>;
}

interface SuccessResponse<T> {
  ok: true;
  data: T;
}

export type BackendResponse<T> = SuccessResponse<T> | ErrorResponse;
