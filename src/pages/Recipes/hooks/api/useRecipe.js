import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useRecipe(recipeId) {
  const request = useRequest();

  return useQuery(["recipes", recipeId], () => request(`/recipes/${recipeId}`));
}

export default useRecipe;
