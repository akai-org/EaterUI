import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import ShoppingListDetails from "./pages/ShoppingList/ShoppingListDetails";
import MenuDetails from "./pages/Menu/MenuDetails";
import MenuListing from "./pages/Menu/MenuListing";
import MenuPlanning from "./pages/Menu/MenuPlanning";
import RecipeRouter from "./pages/Recipes/RecipeRouter";
import "./assets/index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/recipes/*" element={<RecipeRouter />} />

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
