import { CommentRepository } from "../repositories/comment-repository.js";

export class CommentController {
  async getCommentsByMostRecentDate(request, response) {
    const result = await new CommentRepository().getCommentsByMostRecentDate();

    return response.status(200).send(result);
  }
}
