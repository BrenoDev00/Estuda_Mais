import { pool } from "./data-base.js";
import camelcaseKeys from "camelcase-keys";

export class TotalRecordsRepository {
  async getTotalRecords() {
    const query =
      "SELECT 'comments' as table, COUNT(*) AS total FROM public.comment UNION ALL SELECT 'tasks' as task, COUNT(*) AS total FROM public.task;";

    try {
      const result = (await pool.query(query)).rows;

      return camelcaseKeys(result, { deep: true });
    } catch (error) {
      throw error;
    }
  }
}
