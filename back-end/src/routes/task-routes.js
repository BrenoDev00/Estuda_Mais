import { Router } from "express";
import { TaskController } from "../controllers/task-controller.js";

export const taskRouter = Router();

taskRouter.get("/", async (request, response) => {
  return await new TaskController().getTasksByMostRecentDate(request, response);
});

taskRouter.post("/", async (request, response) => {
  return await new TaskController().createTask(request, response);
});

taskRouter.put("/:id", async (request, response) => {
  return await new TaskController().updateTaskById(request, response);
});

taskRouter.delete("/:id", async (request, response) => {
  return await new TaskController().deleteTaskById(request, response);
});
