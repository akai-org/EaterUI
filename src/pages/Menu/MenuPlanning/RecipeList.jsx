import React, { useState } from "react";
import propTypes from "prop-types";
import { Card, Input } from "@/components";
import { recipePropType } from "@/utils/propTypes";
import styles from "./RecipeList.module.scss";

export function RecipeList({ recipes, onSelect }) {
  const [query, setQuery] = useState("");

  return (
    <>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        wrapperClassName={styles.inputWrapper}
        placeholder="Szukaj po nazwie"
      />
      <div className={styles.listWrapper}>
        {recipes
          .filter(({ name }) =>
            name.toLowerCase().includes(query.toLowerCase()),
          )
          .map(({ id, name, description, graphicURL }) => (
            <Card
              key={id}
              primaryText={name}
              secondaryText={description}
              imageUrl={graphicURL}
              onClick={() => onSelect(id)}
            />
          ))}
      </div>
    </>
  );
}

RecipeList.propTypes = {
  recipes: propTypes.arrayOf(recipePropType),
  onSelect: propTypes.func,
};
