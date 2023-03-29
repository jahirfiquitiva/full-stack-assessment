import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createErrorResponse } from './../utils/responses';
import type { ApiResponse } from './../types/';

export const validator = (
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction,
): void => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(createErrorResponse(errors.mapped()));
      return;
    }
  } catch (e) {
    res.status(400).json(createErrorResponse((e as Error)?.message));
    return;
  }
  next();
};
