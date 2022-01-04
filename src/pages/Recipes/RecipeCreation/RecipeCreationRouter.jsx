import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RecipeCreation from "./RecipeCreation";
import useCreateRecipe from "../hooks/api/useCreateRecipe";
import { schema } from "./formSchema";
import useIngredients from "../hooks/useIngredients";
import AddIngredient from "../AddIngredient/AddIngredient";

const RecipeCreationRouter = () => {
  const { mutate, isError, isLoading } = useCreateRecipe();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    ingredients,
    ingredientToEdit,
    addIngredient,
    deleteIngredient,
    handleEditLinkClick,
  } = useIngredients();

  const handleSubmitForm = async (data) => {
    console.log(data);
    const dataToSend = {
      ...data,
      ingredients: ingredients.map(({ id, ...rest }) => ({
        ...rest,
      })),
    };

    mutate(dataToSend, {
      onSuccess: () => {
        navigate("/recipes");
      },
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RecipeCreation
            register={register}
            handleSubmit={handleSubmit(handleSubmitForm)}
            errors={errors}
            ingredients={ingredients}
            handleEditLinkClick={handleEditLinkClick}
            isError={isError}
            isLoading={isLoading}
          />
        }
      />
      <Route
        path="/add-ingredient"
        element={
          <AddIngredient
            onSubmit={addIngredient}
            ingredientToEdit={ingredientToEdit}
            deleteIngredient={deleteIngredient}
          />
        }
      />
    </Routes>
  );
};

export default RecipeCreationRouter;
