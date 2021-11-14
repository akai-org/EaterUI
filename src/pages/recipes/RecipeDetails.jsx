import React from "react";
import { Link, useParams } from "react-router-dom";
// import { getRecipe } from "../../api/recipes";
import useRecipe from "./hooks/useRecipe";

function RecipeDetails() {
  const { recipeId } = useParams();
  // const [state, setState] = React.useState({ isLoading: true });

  // React.useEffect(() => {
  //   async function fetchRecipeDetails() {
  //     setState({ isLoading: true });

  //     try {
  //       const data = await getRecipe(recipeId);
  //       setState({ isSuccess: true, data });
  //     } catch (error) {
  //       setState({ isError: true, error });
  //     }
  //   }

  //   fetchRecipeDetails();
  // }, []);

  const [state] = useRecipe(recipeId);

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (state.isError) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <>
      <Link to="/recipes">back to recipes</Link>
      <h1>Recipe: </h1>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
    </>
  );
}

export default RecipeDetails;
