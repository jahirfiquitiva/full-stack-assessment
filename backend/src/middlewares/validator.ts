import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import type { ApiResponse } from './../types/';

export const validator = (
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};
