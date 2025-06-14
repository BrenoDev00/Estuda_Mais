import { BaseRepository } from "./base-repository.js";
import { commentColumnsToGet } from "../utils/constants/table-columns.js";

export class CommentRepository extends BaseRepository {
  async getCommentsByMostRecentDate() {
    try {
      return await super.selectWithJoinOrderedBy(
        commentColumnsToGet,
        "public.comment",
        "INNER JOIN",
        "public.task",
        "public.comment.task_id",
        "public.task.id",
        "public.comment.created_at",
        "DESC"
      );
    } catch (error) {
      throw error;
    }
  }
}
