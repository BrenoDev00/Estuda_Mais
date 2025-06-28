import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ListCommentsInterface,
  NewCommentInterface,
} from "@/types/comment/comment.type";
import axios from "axios";
import { BASE_API_URL } from "@/utils/base-api-url";

export function useGetComments() {
  const {
    data: comments,
    isLoading: commentListLoading,
    isError: commentListError,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async (): Promise<ListCommentsInterface[]> => {
      return (
        await axios.get<ListCommentsInterface[]>(`${BASE_API_URL}/comments`)
      ).data;
    },
    refetchOnWindowFocus: false,
  });

  return { comments, commentListError, commentListLoading, refetch };
}

export function useCreateComment() {
  const createCommentMutation = useMutation({
    mutationFn: async (data: NewCommentInterface): Promise<void> => {
      const { comment, taskId, userName, userEmail } = data;

      const commentValues: Omit<NewCommentInterface, "taskId"> = {
        comment,
        userName,
        userEmail,
      };

      await axios.post<NewCommentInterface>(
        `${BASE_API_URL}/comments/${taskId}`,
        commentValues,
        {
          withCredentials: true,
        }
      );
    },
    retry: false,
  });

  return { createCommentMutation };
}

export function useDeleteComment() {
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string): Promise<void> => {
      await axios.delete(`${BASE_API_URL}/comments/${commentId}`, {
        withCredentials: true,
      });
    },
    retry: false,
  });

  return { deleteCommentMutation };
}
