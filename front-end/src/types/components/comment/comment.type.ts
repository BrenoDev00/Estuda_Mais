import {
  CommentType,
  ListCommentsInterface,
} from "@/types/comment/comment.type";

export interface CommentProps {
  comment: CommentType;
  handleCommentDelete: (
    commentValues: Omit<ListCommentsInterface, "userEmail" | "task">
  ) => void;
  handleCommentUpdate: (
    commentValues: Omit<ListCommentsInterface, "userEmail" | "task">
  ) => void;
}
