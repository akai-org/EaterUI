import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Text } from "@/components";
import useRecipes from "@/pages/Recipes/hooks/api/useRecipes";
import { RecipeSelection } from "./RecipeSelection";
import { RecipePortionSelection } from "./RecipePortionSelection";
import useCreateMenuItem from "../hooks/api/useCreateMenuItem";
import { showSuccessToast } from "@/utils/toast";

function MenuPlanning() {
  const [recipeId, setRecipeId] = useState(null);

  const { date } = useParams();
  const navigate = useNavigate();

  const { data = [], isLoading, isError } = useRecipes();
  const { mutate } = useCreateMenuItem();

  function addMenuItem(portions) {
    mutate(
      {
        date,
        recipeId,
        portions,
      },
      {
        onSuccess: () => {
          navigate(`/menu/${date}`);
          showSuccessToast("Przepis został dodany do menu");
        },
      },
    );
  }

  function clearRecipeId() {
    setRecipeId(null);
  }

  if (isLoading) {
    <p>Ładowanie przepisów...</p>;
  }

  if (isError) {
    <Text>Coś poszło nie tak - spróbuj jeszcze raz!</Text>;
  }

  if (!recipeId) {
    return (
      <RecipeSelection recipes={data} onSelect={(id) => setRecipeId(id)} />
    );
  }

  return (
    <RecipePortionSelection
      isLoading={isLoading}
      recipe={data.find(({ id }) => id === recipeId)}
      onAdd={addMenuItem}
      onBack={clearRecipeId}
    />
  );
}

export default MenuPlanning;
