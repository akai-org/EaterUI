import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Card, Input, Text } from "@/components";
import useRecipes from "../hooks/api/useRecipes";
import styles from "./RecipeListing.module.scss";

function RecipeListing() {
  const [query, setQuery] = useState("");

  const { data = [], isLoading } = useRecipes();

  if (isLoading) {
    return <p>Ładowanie przepisów...</p>;
  }

  return (
    <>
      <Text size="h3">Przepisy</Text>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        wrapperClassName={styles.inputWrapper}
        placeholder="Szukaj po nazwie"
      />
      <div className={styles.listWrapper}>
        {data
          .filter(({ name }) =>
            name.toLowerCase().includes(query.toLowerCase()),
          )
          .map(({ id, name, description, graphicURL }) => (
            <Link to={`/recipes/${id}`} key={id} className={styles.cardLink}>
              <Card
                primaryText={name}
                secondaryText={description}
                imageUrl={graphicURL}
              />
            </Link>
          ))}
      </div>
      <ButtonGroup>
        <Button fullwidth to="/recipes/new">
          Dodaj przepis
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RecipeListing;
