import React from "react";
import { useQuery } from "react-query";
import { getRecipesById } from "../../../api/recipes";
import queryClient from "../../../queryClient";

function useRecipe(recipeId) {
  //   const [state, setState] = React.useState({ isLoading: true, data: [] });

  //   React.useEffect(() => {
  //     getRecipesById(recipeId)
  //       .then((data) => setState({ data, isSuccess: true }))
  //       .catch((error) => setState({ isError: true, error }));
  //   }, []);

  //   return state;
  return useQuery(["recipes", recipeId], () => getRecipesById(recipeId), {
    initialData: () => {
      const recipes = queryClient.getQueryData("recipes");
      const recipe = recipes.find((r) => r.id == recipeId);
      return recipe;
    },
    initialStale: true,
  });
}

export default useRecipe;
