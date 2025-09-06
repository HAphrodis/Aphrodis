import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export function useAuthQuery<TData = unknown, TError = unknown>(
  key: string,
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">,
) {
  const token = useAuthStore((state) => state.token);

  return useQuery<TData, TError>({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axiosInstance.get(key, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    ...options,
  });
}
