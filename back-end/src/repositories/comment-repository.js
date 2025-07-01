import { BaseRepository } from "./base-repository.js";
import {
  commentColumnsToGet,
  commentColumnsToInsert,
  commentColumnsToUpdate,
} from "../utils/constants/table-columns.js";

export class CommentRepository extends BaseRepository {
  async getCommentById(commentId) {
    try {
      return await super.selectById(["id"], "public.comment", commentId);
    } catch (error) {
      throw error;
    }
  }

  async getCommentsByMostRecentDate() {
    try {
      return await super.selectWithJoinOrderedBy(
        commentColumnsToGet,
        "public.comment",
        "RIGHT JOIN",
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

  async createComment(values) {
    try {
      return await super.insertInto(
        "public.comment",
        commentColumnsToInsert,
        values
      );
    } catch (error) {
      throw error;
    }
  }

  async updateCommentById(values, commentId) {
    try {
      return super.updateById(
        "public.comment",
        commentColumnsToUpdate,
        values,
        commentId
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentById(commentId) {
    try {
      return await super.deleteById("public.comment", commentId);
    } catch (error) {
      throw error;
    }
  }
}
