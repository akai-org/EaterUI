import { useMutation } from "react-query";
import queryClient from "@/queryClient";
import { useRequest } from "@/utils/auth";

function useUpdateRecipe(recipeId) {
  const request = useRequest();

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
