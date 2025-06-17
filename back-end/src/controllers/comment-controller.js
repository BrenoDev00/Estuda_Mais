import { CommentRepository } from "../repositories/comment-repository.js";
import { commentSchema } from "../schemas/comment-schema.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import snakecaseKeys from "snakecase-keys";
import { commentColumnsToInsert } from "../utils/constants/table-columns.js";

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
          id: values.taskId,
          task: values.task,
        },
      };

      return formattedValues;
    });

    return response.status(200).send(result);
  }

  async createComment(request, response) {
    const { taskId } = request.params;
    const { body } = request;

    const taskIdValidation = uuidSchema.safeParse(taskId);

    if (!taskIdValidation.success)
      return response.status(400).send(taskIdValidation.error.errors);

    const searchedTaskId = await new CommentRepository().selectById(
      ["id"],
      "public.task",
      taskId
    );

    if (!searchedTaskId.length)
      return response
        .status(404)
        .send({ message: "ID da tarefa não encontrado." });

    const bodyValidation = commentSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const formattedBody = snakecaseKeys({ ...body, taskId: taskId });

    const values = commentColumnsToInsert.reduce((acc, columnName) => {
      acc.push(formattedBody[columnName]);

      return acc;
    }, []);

    await new CommentRepository().createComment(values);

    return response
      .status(201)
      .send({ message: "Comentário adicionado com sucesso!" });
  }
}
