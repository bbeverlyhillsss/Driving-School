import type { Request, Response, NextFunction } from 'express'
import type { ZodType } from 'zod'
import ApiError from '../exceptions/api.error'

export default function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message)
      return next(ApiError.BadRequest('Validation error', errors))
    }

    req.body = result.data
    return next()
  }
}