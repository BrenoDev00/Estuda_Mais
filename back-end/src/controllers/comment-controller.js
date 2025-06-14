import { CommentRepository } from "../repositories/comment-repository.js";

export class CommentController {
  async getCommentsByMostRecentDate(request, response) {
    let result = await new CommentRepository().getCommentsByMostRecentDate();

    result = result.map((values) => {
      const formattedValues = {
        id: values.id,
        comment: values.comment,
        createdAt: values.createdAt,
        userName: values.userName,
        task: {
          taskId: values.taskId,
          task: values.task,
        },
      };

      return formattedValues;
    });

    return response.status(200).send(result);
  }
}
