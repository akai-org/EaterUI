import React, { useState, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Text } from "../../components/Text/Text";
import AddIngredient from "./AddIngredient";
import { Card } from "../../components/Card/Card";
import { Icon } from "../../components/Icon/Icon";

const RecipeCreation = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientToEdit, setIngredientToEdit] = useState(null);
  const navigate = useNavigate();

  const editIngedient = (data) => {
    setIngredients((previousIngredients) => {
      const edited = previousIngredients.map((ingredient) =>
        ingredient.id === data.id ? { ...data, id: data.id } : ingredient,
      );

      return edited;
    });
  };

  const addIngredient = (data) => {
    console.log(data);
    if (ingredients.find(({ id }) => id === data.id)) {
      editIngedient(data);
      return;
    }
    setIngredients((previousIngredients) => [
      ...previousIngredients,
      { id: uuidv4(), ...data },
    ]);
    navigate(-1);
  };

  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    setIngredientToEdit(null);
  };

  const handleEditLinkClick = (data) => {
    console.log(ingredients.find(({ id }) => id === data));
    setIngredientToEdit(ingredients.find(({ id }) => id === data));
  };

  const RecipeCreationElement = () => (
    <form>
      <Text size="h3">Dodaj przepis</Text>
      <Text size="h4">Składniki (na 1 porcję)</Text>
      <div>
        {ingredients.map(({ id, name, amount, measurement }) => (
          <Card
            key={id}
            primaryText={name}
            secondaryText={`${amount} ${measurement}`}
            rightContent={
              <Link to="add-ingredient">
                <Icon name="pencil" size="medium" />
              </Link>
            }
            onClick={() => handleEditLinkClick(id)}
          />
        ))}
      </div>
      <Link to="add-ingredient">Dodaj składnik</Link>
    </form>
  );

  return (
    <Routes>
      <Route path="/" element={<RecipeCreationElement />} />
      <Route
        path="add-ingredient"
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

export default RecipeCreation;
