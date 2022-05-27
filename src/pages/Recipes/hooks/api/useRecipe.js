import { useQuery } from "react-query";
import request from "@/api/request";

function useRecipe(recipeId) {
  return useQuery(["recipes", recipeId], () => request(`/recipes/${recipeId}`));
}

export default useRecipe;
