import * as React from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Text } from "@/components";
import useRecipe from "@/pages/Recipes/hooks/api/useRecipe";
import styles from "./RecipeDetails.module.scss";

function RecipeDetails() {
  const params = useParams();
  const recipeId = params.id;
  const recipeDetails = useRecipe(recipeId);

  if (recipeDetails.isLoading) return <p>Loading...</p>;
  if (recipeDetails.isError) return <p>Error: an error occured</p>;

  return (
    <>
      <div className={styles.recipeDetails}>
        <Text size="h2">{recipeDetails.data.name}</Text>
        <img source={recipeDetails.data.graphicURL} alt="dish graphic"></img>
        <p>{recipeDetails.data.description}</p>
        <Text size="h4">Składniki (na 1 porcję)</Text>
        {recipeDetails.data.ingredients.map((ingredient) => (
          <div className={styles.ingredient} key={ingredient.name}>
            <p>{ingredient.name}</p>
            <p>{`${ingredient.amount} ${ingredient.measure}`}</p>
          </div>
        ))}
      </div>
      <ButtonGroup>
        <Button variant="secondary" fullwidth to="/recipes">
          Cofnij
        </Button>
        <Button variant="primary" fullwidth to={`/recipes/${recipeId}/edit`}>
          Edytuj
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RecipeDetails;
