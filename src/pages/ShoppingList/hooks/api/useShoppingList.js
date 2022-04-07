import { useQuery } from "react-query";
import request from "@/api/request";

function useShoppingList() {
  return useQuery("shopping-list", () => request("/recipes"));
}

export default useShoppingList;
