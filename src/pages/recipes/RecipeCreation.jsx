import React from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { Text } from "../../components/Text/Text";
import AddIngredient from "./AddIngredient";
import { Card } from "../../components/Card/Card";
import { Icon } from "../../components/Icon/Icon";
import useIngredients from "../../hooks/useIngredients";
import styles from "./RecipeCreation.module.scss";
import { Button } from "../../components/Button/Button";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";

const renderRecipeCreation = ({ ingredients, handleEditLinkClick }) => (
  <form className={styles.recipeCreationForm}>
    <Text size="h3">Dodaj przepis</Text>
    <Text size="h4" className={styles.headline}>
      Składniki (na 1 porcję)
      {!ingredients.length && (
        <Text className={styles.emptyState}>
          Nie masz żadnych składników. Dodaj coś!
        </Text>
      )}
    </Text>
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
    <Button to="add-ingredient" fullwidth className={styles.actionButton}>
      Dodaj składnik
    </Button>
    <ButtonGroup className={styles.buttonGroup}>
      <Button variant="secondary" fullwidth to="..">
        Cofnij
      </Button>
      <Button type="submit" fullwidth>
        Zapisz
      </Button>
    </ButtonGroup>
  </form>
);

const RecipeCreation = () => {
  const {
    ingredients,
    ingredientToEdit,
    addIngredient,
    deleteIngredient,
    handleEditLinkClick,
  } = useIngredients();

  return (
    <Routes>
      <Route
        path="/"
        element={renderRecipeCreation({
          ingredients,
          handleEditLinkClick,
        })}
      />
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
