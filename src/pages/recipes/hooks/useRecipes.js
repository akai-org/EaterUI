import React from "react";
import { useQuery } from "react-query";
import { listRecipes } from "../../../api/recipes";

function useRecipes() {
  //   const [state, setState] = React.useState({ isLoading: true, data: [] });

  //   React.useEffect(() => {
  //     listRecipes()
  //       .then((data) => setState({ data, isSuccess: true }))
  //       .catch((error) => setState({ isError: true, error }));
  //   }, []);

  //   return { ...state, setState };

  return useQuery("recipes", () => listRecipes());
}

export default useRecipes;
