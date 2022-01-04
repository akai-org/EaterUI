import React from "react";
import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";

function RecipeListing() {
  const { state } = useRecipes();

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (state.isError) {
    return <p>Error: {state.error.toString()}</p>;
  }

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
    </>
  );
}

export default RecipeListing;
