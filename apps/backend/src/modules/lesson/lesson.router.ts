import { Router } from "express";
import { practiceLessonSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  cancel,
  createPractice,
  getAll,
  updatePractice,
} from "./lesson.controller.js";

const lessonRouter: Router = Router();

lessonRouter.use(authMiddleware);

lessonRouter.get("/", getAll);
lessonRouter.post("/practice", checkRole(Role.ADMIN), validate(practiceLessonSchema), createPractice);
lessonRouter.put("/:id", checkRole(Role.ADMIN), validate(practiceLessonSchema), updatePractice);
lessonRouter.post("/:id/cancel", checkRole(Role.ADMIN), cancel);

export default lessonRouter;