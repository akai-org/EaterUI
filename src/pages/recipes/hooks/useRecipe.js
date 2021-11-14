import React from "react";
import { getRecipe } from "../../../api/recipes";

function useRecipe(recipeId) {
  const [state, setState] = React.useState({ isLoading: true });

  React.useEffect(() => {
    async function fetchRecipeDetails() {
      setState({ isLoading: true });

      try {
        const data = await getRecipe(recipeId);
        setState({ isSuccess: true, data });
      } catch (error) {
        setState({ isError: true, error });
      }
    }

    fetchRecipeDetails();
  }, []);

  return [state];
}

export default useRecipe;
