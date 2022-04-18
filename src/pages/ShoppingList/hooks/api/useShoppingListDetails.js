import { useQuery } from "react-query";
import request from "@/api/request";

function useShoppingListDetails(id) {
  return useQuery("shopping-list-details", () =>
    request(`/shopping-list/${id}`),
  );
}

export default useShoppingListDetails;
