import { Router } from "express";
import { paymentSchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { create, getAll, remove, update } from "./payment.controller.js";

const paymentRouter: Router = Router();

paymentRouter.use(authMiddleware);

paymentRouter.get("/", checkRole(Role.ADMIN, Role.STUDENT), getAll);
paymentRouter.post("/", checkRole(Role.ADMIN), validate(paymentSchema), create);
paymentRouter.put("/:id", checkRole(Role.ADMIN), validate(paymentSchema), update);
paymentRouter.delete("/:id", checkRole(Role.ADMIN), remove);

export default paymentRouter;