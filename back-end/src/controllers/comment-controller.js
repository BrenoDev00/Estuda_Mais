import { CommentRepository } from "../repositories/comment-repository.js";
import {
  commentSchema,
  updateCommentSchema,
} from "../schemas/comment-schema.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import snakecaseKeys from "snakecase-keys";
import {
  commentColumnsToInsert,
  commentColumnsToUpdate,
} from "../utils/constants/table-columns.js";

export class CommentController {
  async getCommentsByMostRecentDate(request, response) {
    let result = await new CommentRepository().getCommentsByMostRecentDate();

    result = result.map((values) => {
      const formattedValues = {
        id: values.id,
        comment: values.comment,
        createdAt: values.createdAt,
        userName: values.userName,
        userEmail: values.userEmail,
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

  async updateCommentById(request, response) {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedCommentId = await new CommentRepository().getCommentById(id);

    if (!searchedCommentId.length)
      return response
        .status(404)
        .send({ message: "Comentário não encontrado." });

    const bodyValidation = updateCommentSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const formattedBody = snakecaseKeys(body);

    const values = commentColumnsToUpdate.map(
      (column) => formattedBody[column]
    );

    await new CommentRepository().updateCommentById(values, id);

    return response
      .status(200)
      .send({ message: "Comentário atualizado com sucesso!" });
  }

  async deleteCommentById(request, response) {
    const { id } = request.params;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedId = await new CommentRepository().getCommentById(id);

    if (!searchedId.length)
      return response
        .status(404)
        .send({ message: "Comentário não encontrado." });

    try {
      await new CommentRepository().deleteCommentById(id);

      return response
        .status(200)
        .send({ message: "Comentário removido com sucesso!" });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro interno do servidor." });
    }
  }
}
