import { Button, ButtonGroup, Input, Text, Textarea } from "@/components";
import PropTypes from "prop-types";
import React from "react";
import { number, string } from "yup";
import IngredientsList from "./IngredientsList";
import styles from "./RecipeCreation.module.scss";

const RecipeCreation = ({
  register,
  handleSubmit,
  errors,
  ingredients,
  handleEditLinkClick,
  isLoading,
  edition = false,
}) => {
  const title = edition ? "Edytuj przepis" : "Dodaj przepis";
  return (
    <form className={styles.recipeCreationForm} onSubmit={handleSubmit}>
      <Text size="h3">{title}</Text>
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
      {errors.length > 0 && (
        <Text>Coś poszło nie tak - spróbuj jeszcze raz!</Text>
      )}

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
};

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
  edition: PropTypes.boolean,
};

export default RecipeCreation;
