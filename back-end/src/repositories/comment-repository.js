import { BaseRepository } from "./base-repository.js";
import { commentColumnsToGet } from "../utils/constants/table-columns.js";

export class CommentRepository extends BaseRepository {
  async getCommentsByMostRecentDate() {
    try {
      return await super.selectOrderedBy(
        commentColumnsToGet,
        "public.comment",
        "created_at",
        "DESC"
      );
    } catch (error) {
      throw error;
    }
  }
}
