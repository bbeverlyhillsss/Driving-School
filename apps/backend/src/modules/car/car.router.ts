import { Router } from "express";
import { carSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAll, create, update, remove } from "./car.controller.js";

const carRouter: Router = Router();

carRouter.use(authMiddleware);

carRouter.get("/", getAll);
carRouter.post("/", checkRole(Role.ADMIN), validate(carSchema), create);
carRouter.put("/:id", checkRole(Role.ADMIN), validate(carSchema), update);
carRouter.delete("/:id", checkRole(Role.ADMIN), remove);

export default carRouter;