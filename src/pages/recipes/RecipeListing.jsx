import React from "react";
import { Link } from "react-router-dom";
// import { listRecipes } from "../../api/recipes";
import AddRecipeForm from "./components/AddRecipeForm";
import useRecipes from "./hooks/useRecipes";

function RecipeListing() {
  // const [state, setState] = React.useState({ isLoading: true });

  // React.useEffect(() => {
  //   async function fetchRecipes() {
  //     setState({ isLoading: true });

  //     try {
  //       const data = await listRecipes();
  //       setState({ isSuccess: true, data });
  //     } catch (error) {
  //       setState({ isError: true, error });
  //     }
  //   }

  //   fetchRecipes();
  // }, []);

  // function onRecipeAdded(newRecipe) {
  //   setState((oldState) => ({
  //     ...oldState,
  //     data: [newRecipe, ...oldState.data],
  //   }));
  // }

  const [state, setState] = useRecipes();

  function onRecipeAdded(newRecipe) {
    setState((oldState) => ({
      ...oldState,
      data: [newRecipe, ...oldState.data],
    }));
  }

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (state.isError) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <>
      <h1>Recipes</h1>
      <ul>
        {state.data.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/recipes/${id}`}>
              {id}: {name}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <AddRecipeForm onRecipeAdded={onRecipeAdded} />
    </>
  );
}

export default RecipeListing;
