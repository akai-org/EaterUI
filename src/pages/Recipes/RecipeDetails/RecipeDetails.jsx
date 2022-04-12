import * as React from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Text } from "@/components";
import useRecipe from "@/pages/Recipes/hooks/api/useRecipe";

function RecipeDetails() {
  const params = useParams();
  const recipeId = params.id;
  console.log(recipeId);
  const tekst = `id przepisu: ${recipeId}`;
  const recipeDetails = useRecipe(recipeId);
  console.log(recipeDetails);

  if (recipeDetails.isLoading) return <p>Loading...</p>;
  if (recipeDetails.isError) return <p>Error: an error occured</p>;

  return (
    <>
      <Text size="h2">{recipeDetails.data.name}</Text>
      <Text size="h3">{tekst}</Text>
      <ButtonGroup>
        <Button variant="secondary" fullwidth to="/recipes">
          Cofnij
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RecipeDetails;
