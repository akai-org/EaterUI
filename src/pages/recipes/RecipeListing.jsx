import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listRecipes } from "../../api/recipes";
import AddRecipeForm from "./AddRecipeForm";
import useRecipes from "./hooks/useRecipes";

function RecipeListing() {
  // const [state, setState] = useState({ isLoading: true, data: [] });

  // useEffect(() => {
  //   listRecipes()
  //     .then((data) => setState({ data, isSuccess: true }))
  //     .catch((error) => setState({ isError: true, error }));
  // }, []);

  const state = useRecipes();

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (state.isError) {
    return <p>Error: {state.error.toString()}</p>;
  }

  // function handleRecipeAdded(newRecipe) {
  //   console.log({ newRecipe });

  //   state.setState((oldState) => ({
  //     ...oldState,
  //     data: [newRecipe, ...oldState.data],
  //   }));
  // }

  return (
    <>
      <h1>Recipes</h1>
      <ul>
        {state.data.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/recipe/${id}`}>
              {id}: {name}
            </Link>
          </li>
        ))}
      </ul>
      {/* <AddRecipeForm onRecipeAdded={handleRecipeAdded} /> */}
      <AddRecipeForm />
    </>
  );
}

export default RecipeListing;
