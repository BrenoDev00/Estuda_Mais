import { Router } from "express";
import { CommentController } from "../controllers/comment-controller.js";

export const commentRouter = Router();

commentRouter.get("/", async (request, response) => {
  return await new CommentController().getCommentsByMostRecentDate(
    request,
    response
  );
});

commentRouter.post("/:taskId", async (request, response) => {
  return await new CommentController().createComment(request, response);
});

commentRouter.put("/:id", async (request, response) => {
  return await new CommentController().updateCommentById(request, response);
});

commentRouter.delete("/:id", async (request, response) => {
  return await new CommentController().deleteCommentById(request, response);
});
