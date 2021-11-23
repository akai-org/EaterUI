import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipesById } from "../../api/recipes";

function RecipeDetails() {
  const params = useParams();

  const [state, setState] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    getRecipesById(params.recipeId)
      .then((data) => setState({ data, isSuccess: true }))
      .catch((error) => setState({ isError: true, error }));
  }, []);

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (state.isError) {
    return <p>Error: {state.error.toString()}</p>;
  }

  return (
    <>
      <h1>Recipe Detail</h1>
      <h2>{params.recipeId}</h2>
      <p>{state.data.id}</p>
      <p>{state.data.name}</p>
      <ul>
        {state.data.ingredients.map(({ name, amount, measure }) => (
          <li key={name}>
            {name} {amount} {measure}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeDetails;
