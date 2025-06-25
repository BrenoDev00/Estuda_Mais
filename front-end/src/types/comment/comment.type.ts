import { CommentSchemaType } from "../schemas";

export interface ListCommentsInterface {
  id: string;
  comment: string;
  createdAt: string;
  userName: string;
  userEmail: string;
  task: {
    id: string;
    task: string;
  };
}

export type CommentType = Omit<ListCommentsInterface, "task">;

export interface NewCommentInterface extends CommentSchemaType {
  taskId: string;
  userName: string;
  userEmail: string;
}
