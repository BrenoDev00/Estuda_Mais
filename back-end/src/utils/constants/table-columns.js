export const taskColumnsToGet = ["id", "task", "is_public", "user_email"];

export const taskColumnsToInsert = ["task", "is_public", "user_email"];

export const taskColumnsToUpdate = ["task", "is_public"];

export const commentColumnsToGet = [
  "public.comment.id",
  "public.comment.comment",
  "public.comment.created_at",
  "public.comment.user_name",
  "public.task.id as task_id",
  "public.task.task",
];

export const commentColumnsToInsert = ["comment", "task_id", "user_name"];
