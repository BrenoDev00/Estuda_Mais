import { Router } from "express";
import { CommentController } from "../controllers/comment-controller.js";

export const commentRouter = Router();

commentRouter.get("/", async (request, response) => {
  return await new CommentController().getCommentsByMostRecentDate(
    request,
    response
  );
});
