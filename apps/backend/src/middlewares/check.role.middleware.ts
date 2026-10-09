import type { Request, Response, NextFunction } from 'express'
import type { Role } from '@driving-school/shared'
import ApiError from '../exceptions/api.error.js'

export default function checkRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.UnauthorizedError())
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.Forbidden())
    }

    return next()
  }
}