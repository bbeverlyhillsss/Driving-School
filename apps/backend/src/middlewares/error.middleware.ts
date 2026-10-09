import type { Request, Response, NextFunction } from 'express'
import { Prisma } from '../../generated/prisma/client'
import ApiError from '../exceptions/api.error'

const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  console.log(error)

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    })
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Duplicate field value entered.' })
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Resource not found.' })
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'Related resource not found.' })
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: 'Invalid data provided.' })
  }

  return res.status(500).json({ message: 'Server error.' })
}

export default errorMiddleware