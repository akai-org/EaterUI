import React from "react";
import propTypes from "prop-types";
import { Button, ButtonGroup, Text } from "@/components";
import { recipePropType } from "@/utils/propTypes";
import { RecipeList } from "./RecipeList";

export function RecipeSelection({ recipes, date, onSelect }) {
  return (
    <>
      <Text size="h3">Wybierz danie</Text>
      <RecipeList recipes={recipes} onSelect={onSelect} />
      <ButtonGroup>
        <Button variant="secondary" fullwidth to={`/menu/${date}`}>
          Cofnij
        </Button>
      </ButtonGroup>
    </>
  );
}

RecipeSelection.propTypes = {
  recipes: propTypes.arrayOf(recipePropType),
  date: propTypes.string,
  onSelect: propTypes.func,
};
