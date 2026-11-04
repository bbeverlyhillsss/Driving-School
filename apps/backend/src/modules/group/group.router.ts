import { Router } from "express";
import { groupSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAll, create, update, remove } from "./group.controller.js";

const groupRouter: Router = Router();

groupRouter.use(authMiddleware);

groupRouter.get("/", getAll);
groupRouter.post("/", checkRole(Role.ADMIN), validate(groupSchema), create);
groupRouter.put("/:id", checkRole(Role.ADMIN), validate(groupSchema), update);
groupRouter.delete("/:id", checkRole(Role.ADMIN), remove);

export default groupRouter;