import React from "react";
import { Routes, Route } from "react-router-dom";
import RecipeListing from "./pages/Recipes/RecipeListing";
import Login from "./pages/Login/Login";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import ShoppingListDetails from "./pages/ShoppingList/ShoppingListDetails";
import RecipeDetails from "./pages/Recipes/RecipeDetails";
import RecipeCreation from "./pages/Recipes/RecipeCreation";
import MenuDetails from "./pages/Menu/MenuDetails";
import MenuListing from "./pages/Menu/MenuListing";
import MenuPlanning from "./pages/Menu/MenuPlanning";
import "./assets/index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/recipes" element={<RecipeListing />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      <Route path="/recipes/new/*" element={<RecipeCreation />} />

      <Route path="/menu" element={<MenuListing />} />
      <Route path="/menu/:date" element={<MenuDetails />} />
      <Route path="/menu/:date/new" element={<MenuPlanning />} />
      <Route path="/menu/:date/:entryId" element={<MenuPlanning />} />

      <Route path="/shopping-list" element={<ShoppingList />} />
      <Route
        path="/shopping-list/:shopingDetailId"
        element={<ShoppingListDetails />}
      />
    </Routes>
  );
}

export default App;
