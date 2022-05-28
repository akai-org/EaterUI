import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import ShoppingListAdd from "./pages/ShoppingList/ShoppingListAdd";
import ShoppingListDetails from "./pages/ShoppingList/ShoppingListDetails";
import MenuRouter from "./pages/Menu/MenuRouter";
import RecipeRouter from "./pages/Recipes/RecipeRouter";
import { Navbar } from "./components/index";
import "./assets/index.scss";
import { ToastBox } from "@/utils/toast";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/*" element={<RecipeRouter />} />
        <Route path="/menu/*" element={<MenuRouter />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/shopping-list/add" element={<ShoppingListAdd />} />
        <Route
          path="/shopping-list/:shopingDetailId"
          element={<ShoppingListDetails />}
        />
      </Routes>
      <ToastBox />
    </>
  );
}

export default App;
