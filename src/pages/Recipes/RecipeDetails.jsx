import React from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const params = useParams();

  return <div>Details {params.recipeId}</div>;
}

export default RecipeDetails;
