import React from "react";
import { Route, Routes } from "react-router";
import MenuDetails from "./MenuDetails/MenuDetails";
import MenuListing from "./MenuListing/MenuListing";
import MenuPlanning from "./MenuPlanning/MenuPlanning";

const MenuRouter = () => (
  <Routes>
    <Route path="/" element={<MenuListing />} />
    <Route path="/:date" element={<MenuDetails />} />
    <Route path="/:date/add" element={<MenuPlanning />} />
  </Routes>
);

export default MenuRouter;
