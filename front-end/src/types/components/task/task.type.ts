import { ListTasksInterface } from "@/types/task/task.type";

export interface TaskProps {
  variant: "newTask" | "publicTask";
  text: string;
  isPublic: boolean;
  taskValues: ListTasksInterface;
  handleTaskShare: (taksId: string) => void;
  handleTaskDelete: (taskValues: ListTasksInterface) => void;
  handleTaskUpdate: (taskValues: ListTasksInterface) => void;
}
