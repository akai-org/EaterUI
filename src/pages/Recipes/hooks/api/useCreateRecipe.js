import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";
import { showErrorToast } from "@/utils/toast";

function useCreateRecipe() {
  return useMutation(
    (recipeData) => request("/recipes", { method: "POST", body: recipeData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipes");
      },
      onError: () => {
        showErrorToast("Nie udało się dodać przepisu");
      },
    },
  );
}

export default useCreateRecipe;
