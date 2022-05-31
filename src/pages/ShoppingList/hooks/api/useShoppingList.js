import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useShoppingList() {
  const request = useRequest();

  return useQuery("shopping-list", () => request("/shopping-list"));
}

export default useShoppingList;
