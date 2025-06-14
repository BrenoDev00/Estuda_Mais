import { useQuery } from "@tanstack/react-query";
import { ListCommentsInterface } from "@/types/comment/comment.type";
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
