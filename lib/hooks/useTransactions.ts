import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Transaction from "../types/transaction";
import { BASE_URL } from "../utils";

export const getTransactionsQueryKey = (page: number) => ["buildings", page];

const useTransactions = (page: number): UseQueryResult<Transaction[]> => {
  const authHeader = useAuthHeader();
  return useQuery<Transaction[]>({
    queryKey: getTransactionsQueryKey(page),
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/me/transactions?page=${page}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      return response.data;
    },
  });
};

export default useTransactions;
