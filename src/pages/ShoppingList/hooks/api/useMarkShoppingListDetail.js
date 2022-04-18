import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";

function useMarkShoppingListDetail() {
  return useMutation(
    (shoppingData) =>
      request(
        `/shopping-list/${shoppingData.mealId}/item/${shoppingData.ingredientId}`,
        {
          method: "PUT",
          body: shoppingData.shoppingRequest,
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("shopping-list");
      },
      onError: () => {
        queryClient.invalidateQueries("shopping-list");
      },
    },
  );
}

export default useMarkShoppingListDetail;
