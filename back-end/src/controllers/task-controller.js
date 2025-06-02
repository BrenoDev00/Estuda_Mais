import { TaskRepository } from "../repositories/task-repository.js";
import { taskSchema, updateTaskSchema } from "../schemas/task-schema.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import {
  taskColumnsToInsert,
  taskColumnsToUpdate,
} from "../utils/constants/table-columns.js";
import snakeCaseKeys from "snakecase-keys";

export class TaskController {
  async getTasksByMostRecentDate(request, response) {
    const result = await new TaskRepository().getTasksByMostRecentDate();

    return response.status(200).send(result);
  }

  async createTask(request, response) {
    const { body } = request;

    const bodyValidation = taskSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const formattedBody = snakeCaseKeys(body);

    const values = taskColumnsToInsert.reduce((acc, columnName) => {
      acc.push(formattedBody[columnName]);

      return acc;
    }, []);

    await new TaskRepository().createTask(values);

    return response
      .status(201)
      .send({ message: "Tarefa adicionada com sucesso!" });
  }

  async updateTaskById(request, response) {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedTask = await new TaskRepository().getTaskById(id);

    if (!searchedTask.length)
      return response.status(404).send({ message: "Tarefa não encontrada." });

    const bodyValidation = updateTaskSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const formattedBody = snakeCaseKeys(body);

    const values = taskColumnsToUpdate.map((column) => formattedBody[column]);

    await new TaskRepository().udpateTaskById(values, id);

    return response
      .status(200)
      .send({ message: "Tarefa atualizada com sucesso!" });
  }

  async deleteTaskById(request, response) {
    const { id } = request.params;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedId = await new TaskRepository().getTaskById(id);

    if (!searchedId.length)
      return response.status(404).send({ message: "Tarefa não encontrada." });

    await new TaskRepository().deleteTaskById(id);

    return response
      .status(200)
      .send({ message: "Tarefa removida com sucesso!" });
  }
}
