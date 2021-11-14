import React from "react";
import { createRecipe } from "../../../api/recipes";

function useCreateRecipe() {
  const [state, setState] = React.useState({ isIdle: true });

  const handleCreateRecipe = React.useCallback(async (values) => {
    setState({ isLoading: true });
    try {
      const data = await createRecipe(values);
      setState({ isSuccess: true, data });
      return data;
    } catch (error) {
      setState({ isError: true, error });
    }
  }, []);

  return [handleCreateRecipe, state];
}

export default useCreateRecipe;
