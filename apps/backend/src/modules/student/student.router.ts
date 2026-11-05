import { Router } from "express";
import { Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import { getAll } from "./student.controller.js";

const studentRouter: Router = Router();

studentRouter.use(authMiddleware);

studentRouter.get("/", checkRole(Role.ADMIN), getAll);

export default studentRouter;