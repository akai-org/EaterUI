import React from "react";
import { Route, Routes } from "react-router";
import RecipeCreationRouter from "./RecipeCreation/RecipeCreationRouter";
import RecipeListing from "./RecipeListing/RecipeListing";
import RecipeDetails from "./RecipeDetails/RecipeDetails";
import RecipeEditionRouter from "./RecipeEdition/RecipeEdition";

const RecipeRouter = () => (
  <Routes>
    <Route path="/" element={<RecipeListing />} />
    <Route path="/new/*" element={<RecipeCreationRouter />} />
    <Route path="/:id" element={<RecipeDetails />} />
    <Route path="/:id/edit/*" element={<RecipeEditionRouter />} />
  </Routes>
);

export default RecipeRouter;
