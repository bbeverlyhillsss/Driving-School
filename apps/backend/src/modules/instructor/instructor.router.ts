import { Router } from "express";
import { instructorSchema, instructorUpdateSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAll, create, update, remove } from "./instructor.controller.js";

const instructorRouter: Router = Router();

instructorRouter.use(authMiddleware);

instructorRouter.get("/", getAll);
instructorRouter.post("/", checkRole(Role.ADMIN), validate(instructorSchema), create);
instructorRouter.put("/:id", checkRole(Role.ADMIN), validate(instructorUpdateSchema), update);
instructorRouter.delete("/:id", checkRole(Role.ADMIN), remove);

export default instructorRouter;