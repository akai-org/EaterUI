import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Text } from "@/components";
import AddIngredient from "../AddIngredient/AddIngredient";
import useRecipe from "../hooks/api/useRecipe";
import useUpdateRecipe from "../hooks/api/useUpdateRecipe";
import useIngredients from "../hooks/useIngredients";
import { recipeFormSchema } from "../RecipeCreation/formSchema";
import RecipeCreation from "../RecipeCreation/RecipeCreation";

const RecipeEditionRouter = () => {
  const params = useParams();
  const recipeId = params.id;
  const { data: recipeDetails } = useRecipe(recipeId);
  const ingredientsList = recipeDetails.ingredients;

  const { mutate, isError, isLoading } = useUpdateRecipe(recipeId);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeFormSchema),
    defaultValues: {
      name: recipeDetails.name,
      description: recipeDetails.description,
      graphicURL: recipeDetails.graphicURL,
    },
  });

  const {
    ingredients,
    ingredientToEdit,
    addIngredient,
    deleteIngredient,
    handleEditLinkClick,
  } = useIngredients(
    ingredientsList.map((ingredient) => ({ ...ingredient, id: uuidv4() })),
  );

  const handleSubmitForm = async (data) => {
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
    <>
      <Text size="h3">{recipeDetails.name}</Text>
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
              edition={true}
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
    </>
  );
};

export default RecipeEditionRouter;
