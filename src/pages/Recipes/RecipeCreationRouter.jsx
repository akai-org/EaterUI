import React from "react";
import { Route, Routes } from "react-router";
import AddIngredient from "./AddIngredient/AddIngredient";
import useIngredients from "@/hooks/useIngredients";
import RecipeCreation from "./RecipeCreation/RecipeCreation";
import RecipeListing from "./RecipeListing/RecipeListing";
import RecipeDetails from "./RecipeDetails/RecipeDetails";

const RecipeCreationRouter = () => {
  const {
    ingredients,
    ingredientToEdit,
    addIngredient,
    deleteIngredient,
    handleEditLinkClick,
  } = useIngredients();

  return (
    <Routes>
      <Route path="/" element={<RecipeListing />} />
      <Route
        path="/new"
        element={
          <RecipeCreation
            ingredients={ingredients}
            handleEditLinkClick={handleEditLinkClick}
          />
        }
      />
      <Route
        path="/new/add-ingredient"
        element={
          <AddIngredient
            onSubmit={addIngredient}
            ingredientToEdit={ingredientToEdit}
            deleteIngredient={deleteIngredient}
          />
        }
      />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
};

export default RecipeCreationRouter;
