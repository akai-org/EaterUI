import React from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
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
          <>
            <Text size="h3">Dodaj przepis</Text>
            <Link to="add-ingredient">Dodaj składnik</Link>
          </>
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
