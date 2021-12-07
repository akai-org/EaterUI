import React from "react";
import { createRecipe } from "../../../api/recipes";

function useCreateRecipe({ onRecipeAdded }) {
  const [state, setState] = React.useState({ isIdle: true });

  async function mutate(values) {
    setState({ isLoading: true });

    try {
      const data = await createRecipe(values);
      setState({ isSuccess: true, data });
      onRecipeAdded({ ...data, ...values });
    } catch (error) {
      setState({ isError: true, error });
    }
  }

  return { ...state, mutate };
}

export default useCreateRecipe;
