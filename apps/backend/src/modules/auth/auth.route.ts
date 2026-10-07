import { Router } from "express";
import { register, login } from "./auth.controller";
import validate from "../../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "./auth.validation";

const authRouter: Router = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);

export default authRouter;
