import { BaseRepository } from "./base-repository.js";
import {
  taskColumnsToInsert,
  taskColumnsToGet,
  taskColumnsToUpdate,
} from "../utils/constants/table-columns.js";

export class TaskRepository extends BaseRepository {
  async getTaskById(taskId) {
    try {
      return await super.selectById(["id"], "public.task", taskId);
    } catch (error) {
      throw error;
    }
  }

  async getTasksByMostRecentDate() {
    try {
      return await super.selectOrderedBy(
        taskColumnsToGet,
        "public.task",
        "created_at",
        "DESC"
      );
    } catch (error) {
      throw error;
    }
  }

  async createTask(values) {
    try {
      return await super.insertInto("public.task", taskColumnsToInsert, values);
    } catch (error) {
      throw error;
    }
  }

  async udpateTaskById(values, taskId) {
    try {
      return await super.updateById(
        "public.task",
        taskColumnsToUpdate,
        values,
        taskId
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteTaskById(taskId) {
    try {
      return await super.deleteById("public.task", taskId);
    } catch (error) {
      throw error;
    }
  }
}
