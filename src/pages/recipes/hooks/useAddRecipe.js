import React from "react";
import { useMutation } from "react-query";
import { createRecipe } from "../../../api/recipes";
import queryClient from "../../../queryClient";

// function useCreateRecipe({ onRecipeAdded }) {
function useCreateRecipe() {
  //   const [state, setState] = React.useState({ isIdle: true });

  //   async function mutate(values) {
  //     setState({ isLoading: true });

  //     try {
  //       const data = await createRecipe(values);
  //       setState({ isSuccess: true, data });
  //       onRecipeAdded({ ...data, ...values });
  //     } catch (error) {
  //       setState({ isError: true, error });
  //     }
  //   }

  //   return { ...state, mutate };

  return useMutation((values) => createRecipe(values), {
    // onSuccess: (response, variables) => {
    //   // 1. invalidate cache
    //   // queryClient.invalidateQueries("recipes");

    //   // 2. update cache once POST succeeded
    //   console.log({ response, variables });
    //   queryClient.setQueryData("recipes", (old) => [
    //     { ...response, ...variables },
    //     ...old,
    //   ]);
    // },

    onMutate: (newRecipe) => {
      const oldRecipes = queryClient.getQueryData("recipes");

      if (oldRecipes) {
        // put new recipe as the first one - depending on the application it may differ
        queryClient.setQueryData("recipes", () => [newRecipe, ...oldRecipes]);
      }

      return () => queryClient.setQueryData("recipes", oldRecipes);
    },
    onError: (error, newRecipe, rollback) => {
      console.error({ error });
      if (rollback) rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries("recipes");
    },
  });
}

export default useCreateRecipe;
