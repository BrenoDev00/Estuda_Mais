import { TaskSchemaType } from "../schemas";

export interface ListTasksInterface extends TaskSchemaType {
  id: string;
  userEmail: string;
}

export interface NewTaskInterface extends TaskSchemaType {
  userEmail: string;
}

export interface UpdateTaskInterface extends TaskSchemaType {
  id: string;
}
