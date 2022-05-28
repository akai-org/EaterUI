import { useMutation } from "react-query";
import queryClient from "@/queryClient";
import { useRequest } from "@/utils/auth";

function useMarkShoppingListDetail() {
  const request = useRequest();

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
