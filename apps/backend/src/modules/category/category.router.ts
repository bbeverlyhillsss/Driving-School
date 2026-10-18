import { Router } from "express";
import { categorySchema, Role } from "@driving-school/shared";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkRole from "../../middlewares/check.role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAll, create, update, remove } from "./category.controller.js";

const categoryRouter: Router = Router();

categoryRouter.use(authMiddleware);

categoryRouter.get("/", getAll);
categoryRouter.post(
  "/",
  checkRole(Role.ADMIN),
  validate(categorySchema),
  create,
);
categoryRouter.put(
  "/:id",
  checkRole(Role.ADMIN),
  validate(categorySchema),
  update,
);
categoryRouter.delete("/:id", checkRole(Role.ADMIN), remove);

export default categoryRouter;
