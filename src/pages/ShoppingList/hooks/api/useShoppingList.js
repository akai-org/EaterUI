import { useQuery } from "react-query";
import request from "@/api/request";

function useShoppingList() {
  return useQuery("shopping-list", () => request("/shopping-list"));
}

export default useShoppingList;
