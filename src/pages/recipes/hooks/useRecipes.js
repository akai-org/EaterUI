import React from "react";
import { listRecipes } from "../../../api/recipes";

function useRecipes() {
  const [state, setState] = React.useState({ isLoading: true });

  React.useEffect(() => {
    async function fetchRecipes() {
      setState({ isLoading: true });

      try {
        const data = await listRecipes();
        setState({ isSuccess: true, data });
      } catch (error) {
        setState({ isError: true, error });
      }
    }

    fetchRecipes();
  }, []);

  return [state, setState];
}

export default useRecipes;
