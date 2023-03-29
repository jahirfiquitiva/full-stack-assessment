import type { Request, Response } from 'express';
import { ApiResponse } from './responses';

export type RequestHandler<T> = (
  request: Request,
  response: Response<ApiResponse<T>>,
) => Promise<Response<ApiResponse<T>>>;
