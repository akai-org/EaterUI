import React from "react";
import PropTypes from "prop-types";
import { string, number } from "yup";
import { Text, Button, ButtonGroup, Input, Textarea } from "@/components";
import IngredientsList from "./IngredientsList";
import styles from "./RecipeCreation.module.scss";

const RecipeCreation = ({
  register,
  handleSubmit,
  errors,
  ingredients,
  handleEditLinkClick,
  isLoading,
}) => (
  <form className={styles.recipeCreationForm} onSubmit={handleSubmit}>
    <Text size="h3">Dodaj przepis</Text>
    <Text size="h4" className={styles.headline}>
      Składniki (na 1 porcję)
      {!ingredients.length && (
        <Text className={styles.emptyState}>
          Nie masz żadnych składników. Dodaj coś!
        </Text>
      )}
    </Text>
    <Input
      label="Nazwa"
      {...register("name")}
      errorMessage={errors?.name?.message}
    />
    <Textarea
      label="Opis"
      {...register("description")}
      errorMessage={errors?.description?.message}
    />
    <Input
      label="Link do grafiki"
      {...register("graphicURL")}
      errorMessage={errors?.graphicURL?.message}
    />

    <IngredientsList
      ingredients={ingredients}
      handleEditLinkClick={handleEditLinkClick}
    />

    <Button to="add-ingredient" fullwidth className={styles.actionButton}>
      Dodaj składnik
    </Button>
    <ButtonGroup className={styles.buttonGroup}>
      <Button variant="secondary" fullwidth to="/recipes">
        Cofnij
      </Button>
      <Button type="submit" fullwidth isDisabled={isLoading}>
        Zapisz
      </Button>
    </ButtonGroup>
  </form>
);

RecipeCreation.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: string,
      amount: number,
      unit: string,
    }),
  ),
  register: PropTypes.any,
  handleSubmit: PropTypes.any,
  errors: PropTypes.any,
  handleEditLinkClick: PropTypes.func,
  isError: PropTypes.boolean,
  isLoading: PropTypes.boolean,
};

export default RecipeCreation;
