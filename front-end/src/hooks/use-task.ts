import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "@/utils/base-api-url";
import {
  NewTaskInterface,
  ListTasksInterface,
  UpdateTaskInterface,
} from "@/types/task/task.type";

export function useGetTasks() {
  const {
    data: tasks,
    isError: taskListError,
    isLoading: taskListLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<ListTasksInterface[]> => {
      return (await axios.get<ListTasksInterface[]>(`${BASE_API_URL}/tasks`))
        .data;
    },
    refetchOnWindowFocus: false,
  });

  return { tasks, taskListError, taskListLoading, refetch };
}

export function useCreateTask() {
  const createTaskMutation = useMutation({
    mutationFn: async (data: NewTaskInterface): Promise<void> => {
      await axios.post<NewTaskInterface>(`${BASE_API_URL}/tasks`, data, {
        withCredentials: true,
      });
    },
    retry: false,
  });

  return { createTaskMutation };
}

export function useUpdateTask() {
  const updateTaskMutation = useMutation({
    mutationFn: async (data: UpdateTaskInterface): Promise<void> => {
      const { id: taskId, task, isPublic } = data;

      const taskValues: Omit<UpdateTaskInterface, "id"> = {
        task,
        isPublic,
      };

      await axios.put<UpdateTaskInterface>(
        `${BASE_API_URL}/tasks/${taskId}`,
        taskValues,
        {
          withCredentials: true,
        }
      );
    },
    retry: false,
  });

  return { updateTaskMutation };
}

export function useDeleteTask() {
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string): Promise<void> => {
      await axios.delete(`${BASE_API_URL}/tasks/${taskId}`, {
        withCredentials: true,
      });
    },
    retry: false,
  });

  return { deleteTaskMutation };
}
