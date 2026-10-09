import type { JwtPayload } from '@driving-school/shared'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export {}