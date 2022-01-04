import React from "react";
import PropTypes from "prop-types";
import { string, number } from "yup";
import { Text, Button, ButtonGroup } from "@/components";
import styles from "./RecipeCreation.module.scss";
import RecipesList from "./RecipesList";

const RecipeCreation = ({ ingredients, handleEditLinkClick }) => (
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
    {/* <RecipeCreationForm /> */}
    <RecipesList
      ingredients={ingredients}
      handleEditLinkClick={handleEditLinkClick}
    />
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

export default RecipeCreation;

RecipeCreation.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: string,
      amount: number,
      unit: string,
    }),
  ),
  handleEditLinkClick: PropTypes.func,
};
