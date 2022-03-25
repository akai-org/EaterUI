import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";

function useCreateRecipe() {
  return useMutation(
    (recipeData) => request("/recipes", { method: "POST", body: recipeData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipes");
      },
    },
  );
}

export default useCreateRecipe;
