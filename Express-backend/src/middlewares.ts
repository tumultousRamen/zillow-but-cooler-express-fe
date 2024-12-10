import { NextFunction, Request, Response } from "express";

import responsePayloadProps from "./interfaces/responsePayloadProps";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<responsePayloadProps>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: "error",
    message: (err as Error).message,
    data: { stack: (err as Error).stack },
  });
}
