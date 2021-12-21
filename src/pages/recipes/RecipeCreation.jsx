import React from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { Text } from "../../components/Text/Text";
import AddIngredient from "./AddIngredient";
import { Card } from "../../components/Card/Card";
import { Icon } from "../../components/Icon/Icon";
import useIngredients from "../../hooks/useIngredients";

const RecipeCreation = () => {
  const {
    ingredients,
    ingredientToEdit,
    addIngredient,
    deleteIngredient,
    handleEditLinkClick,
  } = useIngredients();

  const RecipeCreationElement = () => (
    <form>
      <Text size="h3">Dodaj przepis</Text>
      <Text size="h4">Składniki (na 1 porcję)</Text>
      <div>
        {ingredients.map(({ id, name, amount, measurement }) => (
          <Card
            key={id}
            primaryText={name}
            secondaryText={`${amount} ${measurement}`}
            rightContent={
              <Link to="add-ingredient">
                <Icon name="pencil" size="medium" />
              </Link>
            }
            onClick={() => handleEditLinkClick(id)}
          />
        ))}
      </div>
      <Link to="add-ingredient">Dodaj składnik</Link>
    </form>
  );

  return (
    <Routes>
      <Route path="/" element={<RecipeCreationElement />} />
      <Route
        path="add-ingredient"
        element={
          <AddIngredient
            onSubmit={addIngredient}
            ingredientToEdit={ingredientToEdit}
            deleteIngredient={deleteIngredient}
          />
        }
      />
    </Routes>
  );
};

export default RecipeCreation;
