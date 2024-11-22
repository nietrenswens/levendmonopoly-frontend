import User from "@/lib/types/user";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useUsers from "./useUsers";

export const getUserQueryKey = (id: string) => ["user", id];

const useUser = (id: string): UseQueryResult<User> => {
  const users = useUsers();
  return useQuery<User>({
    queryKey: getUserQueryKey(id),
    queryFn: async () => {
      const user = await users.data?.find((user) => user.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  });
};

export default useUser;
