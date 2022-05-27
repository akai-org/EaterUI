import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";

function useUpdateRecipe(recipeId) {
  return useMutation(
    (recipeData) =>
      request(`/recipes/${recipeId}`, { method: "PUT", body: recipeData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipes");
      },
    },
  );
}

export default useUpdateRecipe;
