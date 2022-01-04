import React from "react";
import PropTypes from "prop-types";
import { string, number } from "yup";
import { Text, Button, ButtonGroup, Input, Textarea } from "@/components";
import styles from "./RecipeCreation.module.scss";
import IngredientsList from "./IngredientsList";

const RecipeCreation = ({
  register,
  handleSubmit,
  errors,
  ingredients,
  handleEditLinkClick,
  isError,
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

    {/* TODO: replace with toast */}
    {isError && <Text>Coś poszło nie tak - spróbuj jeszcze raz!</Text>}

    <Button to="add-ingredient" fullwidth className={styles.actionButton}>
      Dodaj składnik
    </Button>
    <ButtonGroup className={styles.buttonGroup}>
      <Button variant="secondary" fullwidth to="..">
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
