import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import RecipeListing from "./pages/recipes/RecipeListing";
import RecipeDetails from "./pages/recipes/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recipes" element={<RecipeListing />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
