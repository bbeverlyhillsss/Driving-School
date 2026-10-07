import type { SharedUser } from './user'
import type { Role } from './role'

export interface RegisterPayload {
  email: string
  password: string
  fullName: string
  birthDate?: string
  phone?: string
  address?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  user: SharedUser
}

export interface JwtPayload {
  id: number
  email: string
  role: Role
}