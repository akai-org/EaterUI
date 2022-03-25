import * as React from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Text } from "@/components";

function RecipeDetails() {
  const params = useParams();

  return (
    <>
      <Text size="h2">Details</Text>
      <Text>id: {params.id}</Text>
      <ButtonGroup>
        <Button variant="secondary" fullwidth to="/recipes">
          Cofnij
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RecipeDetails;
