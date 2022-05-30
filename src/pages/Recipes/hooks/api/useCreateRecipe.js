import { useMutation } from "react-query";
import queryClient from "@/queryClient";
import { showErrorToast } from "@/utils/toast";
import { useRequest } from "@/utils/auth";

function useCreateRecipe() {
  const request = useRequest();

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
