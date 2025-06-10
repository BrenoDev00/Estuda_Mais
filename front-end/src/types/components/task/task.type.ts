import { ListTasksInterface } from "@/types/task/task.type";

export interface TaskProps {
  text: string;
  taskValues: ListTasksInterface;
  isPublic: boolean;
  handleTaskShare: (taksId: string) => void;
  handleTaskDelete: (taskValues: ListTasksInterface) => void;
  handleTaskUpdate: (taskValues: ListTasksInterface) => void;
}
