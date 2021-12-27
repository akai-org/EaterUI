import React from "react";
import { Routes, Route } from "react-router-dom";
import RecipeListing from "./pages/recipes/RecipeListing";
import Login from "./pages/login/LoginRenamed";
import ShopingList from "./pages/shoping-list/ShopingList";
import ShopingListDetails from "./pages/shoping-list/ShopingListDetails";
import RecipeDetails from "./pages/recipes/RecipeDetails";
import RecipeCreation from "./pages/recipes/RecipeCreation";
import MenuDetails from "./pages/menu/MenuDetails";
import MenuListing from "./pages/menu/MenuListing";
import MenuPlanning from "./pages/menu/MenuPlanning";
import "./assets/index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/recipes" element={<RecipeListing />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      <Route path="/recipe/new/*" element={<RecipeCreation />} />

      <Route path="/menu" element={<MenuListing />} />
      <Route path="/menu/:date" element={<MenuDetails />} />
      <Route path="/menu/:date/new" element={<MenuPlanning />} />
      <Route path="/menu/:date/:entryId" element={<MenuPlanning />} />

      <Route path="/shoping-list" element={<ShopingList />} />
      <Route
        path="/shoping-list/:shopingDetailId"
        element={<ShopingListDetails />}
      />
    </Routes>
  );
}

export default App;
