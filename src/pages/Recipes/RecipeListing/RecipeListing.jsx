import * as React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@/components";
import useRecipes from "../hooks/api/useRecipes";

function RecipeListing() {
  const { data, isLoading } = useRecipes();

  if (isLoading) {
    return <p>Ładowanie przepisów...</p>;
  }

  return (
    <>
      <h1>Przepisy</h1>
      <ul>
        {data?.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/recipes/${id}`}>
              {id}: {name}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonGroup>
        <Button fullwidth to="/recipes/new">
          Dodaj przepis
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RecipeListing;
