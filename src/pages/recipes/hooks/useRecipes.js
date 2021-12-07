import React from "react";
import { listRecipes } from "../../../api/recipes";

function useRecipes() {
  const [state, setState] = React.useState({ isLoading: true, data: [] });

  React.useEffect(() => {
    listRecipes()
      .then((data) => setState({ data, isSuccess: true }))
      .catch((error) => setState({ isError: true, error }));
  }, []);

  return { ...state, setState };
}

export default useRecipes;
