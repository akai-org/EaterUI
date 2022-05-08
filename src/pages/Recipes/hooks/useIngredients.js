import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

const useIngredients = (ingredientsList = []) => {
  const [ingredients, setIngredients] = useState(ingredientsList);
  const [ingredientToEdit, setIngredientToEdit] = useState(null);
  const navigate = useNavigate();

  const editIngedient = (data) => {
    setIngredients((previousIngredients) => {
      const edited = previousIngredients.map((ingredient) =>
        ingredient.id === data.id ? data : ingredient,
      );

      return edited;
    });
    setIngredientToEdit(null);
  };

  const addIngredient = (data) => {
    if (ingredients.find(({ id }) => id === data.id)) {
      editIngedient(data);
    } else {
      setIngredients((previousIngredients) => [
        ...previousIngredients,
        { id: uuidv4(), ...data },
      ]);
    }
    navigate(-1);
  };

  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    setIngredientToEdit(null);
  };

  const handleEditLinkClick = (data) => {
    setIngredientToEdit(ingredients.find(({ id }) => id === data));
  };

  return {
    ingredients,
    ingredientToEdit,
    addIngredient,
    deleteIngredient,
    handleEditLinkClick,
  };
};

export default useIngredients;
