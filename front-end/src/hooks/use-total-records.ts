import { useQuery } from "@tanstack/react-query";
import { ListTotalRecordsInterface } from "@/types/total-records/total-records.type";
import axios from "axios";
import { BASE_API_URL } from "@/utils/base-api-url";

export function useGetTotalRecords() {
  const {
    data: totalRecords,
    isError: totalRecordsListError,
    isLoading: totalRecordsListLoading,
    refetch,
  } = useQuery({
    queryKey: ["totalRecords"],
    queryFn: async (): Promise<ListTotalRecordsInterface[]> => {
      return (
        await axios.get<ListTotalRecordsInterface[]>(
          `${BASE_API_URL}/totalRecords`
        )
      ).data;
    },
    refetchOnWindowFocus: false,
  });

  return {
    totalRecords,
    totalRecordsListError,
    totalRecordsListLoading,
    refetch,
  };
}
