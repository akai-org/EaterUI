import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";

function useMarkShoppingListDetail() {
  return useMutation(
    (shoppingData) =>
      request(
        `/shopping-list/${shoppingData.mealId}/item/${shoppingData.ingredientId}`,
        {
          method: "POST",
          body: shoppingData,
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("shopping-list");
      },
    },
  );
}

export default useMarkShoppingListDetail;
