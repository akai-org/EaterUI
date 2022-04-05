import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";
import { ToastError } from '../../../../utils/toast'

function useCreateRecipe() {
  return useMutation(
    (recipeData) => request("/recipes", { method: "POST", body: recipeData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipes");
      },
      onError: () => {
        ToastError("Nie udało się dodać przepisu");
      }
    },
  );
}

export default useCreateRecipe;
