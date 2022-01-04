import React from "react";
import PropTypes from "prop-types";
import { string, number } from "yup";
import { Link } from "react-router-dom";
import { Text, Card, Button, ButtonGroup, Icon } from "@/components";
import styles from "./RecipeCreation.module.scss";

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
