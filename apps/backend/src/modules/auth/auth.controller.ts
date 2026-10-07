import { AuthResponse, RegisterPayload } from "@driving-school/shared";
import catchAsync from "../../utils/catch-async";
import authService from "./auth.service";

const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export const register = catchAsync<{}, AuthResponse, RegisterPayload>(
  async (req, res) => {
    const { fullName, email, password } = req.body;
    const userData = await authService.register({ fullName, email, password });

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
    });

    return res.status(201).json(userData);
  },
);


