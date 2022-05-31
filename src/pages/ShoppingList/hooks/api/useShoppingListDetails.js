import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useShoppingListDetails(id) {
  const request = useRequest();

  return useQuery(["shopping-list", id], () => request(`/shopping-list/${id}`));
}

export default useShoppingListDetails;
