import { Router } from "express";
import { examSchema, examUpdateSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { create, getAll, remove, update } from "./exam.controller.js";

const examRouter: Router = Router();

examRouter.use(authMiddleware);

examRouter.get("/", getAll);
examRouter.post("/", checkRole(Role.ADMIN), validate(examSchema), create);
examRouter.put("/:studentId/:date", checkRole(Role.ADMIN), validate(examUpdateSchema), update);
examRouter.delete("/:studentId/:date", checkRole(Role.ADMIN), remove);

export default examRouter;