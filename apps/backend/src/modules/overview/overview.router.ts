import { Router } from "express";
import { Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import { getOverview } from "./overview.controller.js";

const overviewRouter: Router = Router();

overviewRouter.use(authMiddleware);

overviewRouter.get("/", checkRole(Role.ADMIN), getOverview);

export default overviewRouter;