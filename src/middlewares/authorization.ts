import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authorization(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeaders = request.headers.authorization;
  if (!authHeaders) throw new Error("JWT token is missing");

  const [, token] = authHeaders.split(" ");

  const verifyToken = verify(token, authConfig.jwt.secret);
  if (!verifyToken) throw new Error("Invalid token");

  const { sub } = verifyToken as IPayload;
  request.user = {
    id: sub,
  };

  return next();
}
