import React from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { Text } from "../../components/Text/Text";
import AddIngredient from "./AddIngredient";

const RecipeCreation = () => {
  const addIngredient = (data) => {
    console.log(data);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container>
            <Text size="h3">Dodaj przepis</Text>
            <Link to="add-ingredient">add</Link>
          </Container>
        }
      />
      <Route
        path="add-ingredient"
        element={<AddIngredient onSubmit={addIngredient} />}
      />
    </Routes>
  );
};

export default RecipeCreation;
