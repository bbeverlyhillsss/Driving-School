import type { SharedUser, Role } from '@driving-school/shared'
import type { User } from '../../../generated/prisma/browser'


export function toSharedUser(user: User): SharedUser {
    return {
        id: user.id,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt.toISOString(),
    }
}