import { TotalRecordsRepository } from "../repositories/total-records-repository.js";

export class TotalRecordsController {
  async getTotalRecords(request, response) {
    try {
      const result = await new TotalRecordsRepository().getTotalRecords();

      const commentTable = result[0];
      const taskTable = result[1];

      const formattedValues = [
        {
          comments: commentTable.total,
          tasks: taskTable.total,
        },
      ];

      return response.status(200).json(formattedValues);
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro interno do servidor." });
    }
  }
}
