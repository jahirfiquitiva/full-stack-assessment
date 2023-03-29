import type { Request, Response } from 'express';
import { ApiResponse } from './responses';

export type RequestHandler<Body, T> = (
  request: Omit<Request, 'body'> & { body: Request['body'] & Body },
  response: Response<ApiResponse<T>>,
) => Promise<Response<ApiResponse<T>>>;
