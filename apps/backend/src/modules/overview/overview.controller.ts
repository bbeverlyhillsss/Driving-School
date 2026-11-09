import type { SharedOverview } from "@driving-school/shared";
import catchAsync from "../../utils/catch-async.js";
import overviewService from "./overview.service.js";

export const getOverview = catchAsync<{}, SharedOverview>(async (req, res) => {
  const overview = await overviewService.getOverview();
  return res.status(200).json(overview);
});