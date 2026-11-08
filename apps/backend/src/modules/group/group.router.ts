import { Router } from "express";
import { addGroupStudentSchema, groupSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAll, create, update, remove } from "./group.controller.js";
import {
  getMembers,
  addMember,
  removeMember,
} from "./group-member.controller.js";
import { generateTheory } from "../lesson/lesson.controller.js";

const groupRouter: Router = Router();

groupRouter.use(authMiddleware);

groupRouter.get("/", getAll);
groupRouter.post("/", checkRole(Role.ADMIN), validate(groupSchema), create);
groupRouter.post("/:id/lessons/theory", checkRole(Role.ADMIN), generateTheory);
groupRouter.put("/:id", checkRole(Role.ADMIN), validate(groupSchema), update);
groupRouter.delete("/:id", checkRole(Role.ADMIN), remove);

groupRouter.get("/:id/students", getMembers);
groupRouter.post(
  "/:id/students",
  checkRole(Role.ADMIN),
  validate(addGroupStudentSchema),
  addMember,
);
groupRouter.delete("/:id/students/:studentId", checkRole(Role.ADMIN), removeMember);

export default groupRouter;