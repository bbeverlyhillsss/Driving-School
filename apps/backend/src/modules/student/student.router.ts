import { Router } from "express";
import { Role, studentSelfSchema, studentUpdateSchema } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAll, getMe, update, updateMe } from "./student.controller.js";

const studentRouter: Router = Router();

studentRouter.use(authMiddleware);

studentRouter.get("/", checkRole(Role.ADMIN), getAll);
studentRouter.get("/me", checkRole(Role.STUDENT), getMe);
studentRouter.put("/me", checkRole(Role.STUDENT), validate(studentSelfSchema), updateMe);
studentRouter.put("/:id", checkRole(Role.ADMIN), validate(studentUpdateSchema), update);

export default studentRouter;