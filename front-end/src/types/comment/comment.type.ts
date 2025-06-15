export interface ListCommentsInterface {
  id: string;
  comment: string;
  createdAt: string;
  userName: string;
  task: {
    id: string;
    task: string;
  };
}

export type CommentType = Omit<ListCommentsInterface, "task">;
