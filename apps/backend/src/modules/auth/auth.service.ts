import bcrypt from "bcrypt";
import { prisma } from "../../config/database.js";
import ApiError from "../../exceptions/api.error.js";
import userService from "../user/user.service.js";
import studentService from "../student/student.service.js";
import tokenService from "./token.service.js";
import { toSharedUser } from "../user/user.mapper.js";
import type {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
} from "@driving-school/shared";

interface AuthServiceResult extends AuthResponse {
  refreshToken: string;
}

export const register = async (
  data: RegisterPayload,
): Promise<AuthServiceResult> => {
  const existingUser = await userService.findByEmail(data.email);
  if (existingUser) {
    throw ApiError.BadRequest(`User with email ${data.email} already exists.`);
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await userService.createUser(
      { email: data.email, passwordHash },
      tx,
    );
    await studentService.createStudentProfile(
      { userId: createdUser.id, fullName: data.fullName },
      tx,
    );
    return createdUser;
  });

  const sharedUser = toSharedUser(user);
  const tokens = tokenService.generateTokens({
    id: sharedUser.id,
    email: sharedUser.email,
    role: sharedUser.role,
  });
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: sharedUser,
  };
};

export const login = async (data: LoginPayload): Promise<AuthServiceResult> => {
  const user = await userService.findByEmail(data.email);
  if (!user) {
    throw ApiError.BadRequest("User with this email not found.");
  }
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );
  if (!isPasswordValid) {
    throw ApiError.BadRequest("Invalid password.");
  }

  const sharedUser = toSharedUser(user);
  const tokens = tokenService.generateTokens({
    id: sharedUser.id,
    email: sharedUser.email,
    role: sharedUser.role,
  });
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: sharedUser,
  };
};

export const logout = async () => {};

export const refresh = async () => {};

export default {
  register,
  login,
};
