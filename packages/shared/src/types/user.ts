import type { Role } from "./role";

export interface SharedUser {
  id: number;
  email: string;
  role: Role;
  createdAt: string;
}
