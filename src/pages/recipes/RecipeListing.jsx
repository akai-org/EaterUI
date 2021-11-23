import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listRecipes } from "../../api/recipes";

function RecipeListing() {
  const [state, setState] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    listRecipes()
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
