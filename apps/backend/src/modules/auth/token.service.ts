import jwt from "jsonwebtoken";
import { prisma } from "../../config/database.js";
import { env } from "../../config/config.js";
import type { JwtPayload } from "@driving-school/shared";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30d

export const generateTokens = (payload: JwtPayload): Tokens => {
  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

export const validateAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};

export const validateRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};

export const saveToken = async (userId: number, refreshToken: string) => {
  return prisma.authToken.create({
    data: {
      userId,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  });
};

export const removeToken = async (refreshToken: string) => {
  return prisma.authToken.deleteMany({
    where: { refreshToken },
  });
};

export const findToken = async (refreshToken: string) => {
  return prisma.authToken.findUnique({
    where: { refreshToken },
  });
};

export default {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
};
