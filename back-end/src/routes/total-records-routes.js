import { Router } from "express";
import { TotalRecordsController } from "../controllers/total-records-controller.js";

export const totalRecordsRouter = Router();

totalRecordsRouter.get("/", async (request, response) => {
  return await new TotalRecordsController().getTotalRecords(request, response);
});
