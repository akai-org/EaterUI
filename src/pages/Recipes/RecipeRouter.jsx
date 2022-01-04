import React from "react";
import { Route, Routes } from "react-router";
import RecipeCreationRouter from "./RecipeCreation/RecipeCreationRouter";
import RecipeListing from "./RecipeListing/RecipeListing";
import RecipeDetails from "./RecipeDetails/RecipeDetails";

const RecipeRouter = () => (
  <Routes>
    <Route path="/" element={<RecipeListing />} />
    <Route path="/new/*" element={<RecipeCreationRouter />} />
    <Route path="/recipe/:id" element={<RecipeDetails />} />
  </Routes>
);

export default RecipeRouter;
