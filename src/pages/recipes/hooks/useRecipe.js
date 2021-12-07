import React from "react";
import { getRecipesById } from "../../../api/recipes";

function useRecipe(recipeId) {
  const [state, setState] = React.useState({ isLoading: true, data: [] });

  React.useEffect(() => {
    getRecipesById(recipeId)
      .then((data) => setState({ data, isSuccess: true }))
      .catch((error) => setState({ isError: true, error }));
  }, []);

  return state;
}

export default useRecipe;
