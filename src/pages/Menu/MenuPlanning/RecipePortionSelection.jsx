import React, { useState } from "react";
import propTypes from "prop-types";
import { Button, ButtonGroup, Card, Input, Text } from "@/components";
import { recipePropType } from "@/utils/propTypes";
import styles from "./RecipePortionSelection.module.scss";

export function RecipePortionSelection({
  recipe: { name, description, graphicURL },
  onAdd,
  onBack,
  isLoading,
}) {
  const [portions, setPortions] = useState(1);

  const increasePortions = () => setPortions((value) => value + 1);
  const decreasePortions = () =>
    setPortions((value) => (value > 1 ? value - 1 : value));

  return (
    <>
      <Text size="h3">Wybierz porcje</Text>
      <Card
        primaryText={name}
        secondaryText={description}
        imageUrl={graphicURL}
      />
      <div className={styles.counterWrapper}>
        <Input
          type="number"
          min={1}
          value={portions}
          onChange={(event) => setPortions(event.target.value)}
          wrapperClassName={styles.inputWrapper}
        />
        <Button isDisabled={isLoading} onClick={decreasePortions}>
          -
        </Button>
        <Button isDisabled={isLoading} onClick={increasePortions}>
          +
        </Button>
      </div>
      <ButtonGroup>
        <Button variant="secondary" fullwidth onClick={onBack}>
          Cofnij
        </Button>
        <Button
          fullwidth
          isDisabled={isLoading}
          onClick={() => onAdd(portions)}
        >
          Dodaj
        </Button>
      </ButtonGroup>
    </>
  );
}

RecipePortionSelection.propTypes = {
  recipe: recipePropType,
  onAdd: propTypes.func,
  onBack: propTypes.func,
  isLoading: propTypes.bool,
};
