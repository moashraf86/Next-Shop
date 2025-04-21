import { fetchOrders } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";

export const useOrders = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  // Fetch order history
  const fetcher = (email: string | undefined) => fetchOrders(email);
  const {
    data: orders = [],
    error,
    isLoading: swrLoading,
  } = useSWR(userLoaded && email ? ["orders", email] : null, () =>
    fetcher(email)
  );
  const isLoading = swrLoading || !userLoaded;

  return {
    orders: orders.data,
    isLoading,
    isEmpty: orders.data?.length === 0 && !swrLoading,
    error,
  };
};
