import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import { schema } from "../../utils/yup";

function AddIngredient({
  onSubmit,
  ingredientToEdit = null,
  deleteIngredient,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/recipe/new");
  };

  console.log(ingredientToEdit);
  const isEditing = ingredientToEdit ?? false;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text size="h3">{isEditing ? "Dodaj" : "Edytuj"} składnik</Text>
      {ingredientToEdit?.id && (
        <Input
          hidden
          label="Id"
          {...register("id")}
          defaultValue={ingredientToEdit?.id}
        />
      )}
      <Input
        label="Nazwa"
        {...register("name")}
        errorMessage={errors?.name?.message}
        defaultValue={ingredientToEdit?.name}
      />
      <Input
        {...register("amount", { valueAsNumber: true })}
        label="Ilość"
        type="number"
        errorMessage={errors?.amount?.message}
        defaultValue={ingredientToEdit?.amount}
      />
      <Input
        label="Miara"
        {...register("measurement")}
        errorMessage={errors?.measurement?.message}
        defaultValue={ingredientToEdit?.measurement}
      />
      <ButtonGroup>
        {isEditing ? (
          <Button
            type="reset"
            variant="danger"
            fullwidth
            onClick={() => {
              handleButtonClick();
              deleteIngredient(ingredientToEdit.id);
            }}
          >
            Usuń
          </Button>
        ) : (
          <Button
            type="reset"
            variant="secondary"
            fullwidth
            onClick={handleButtonClick}
          >
            Cofnij
          </Button>
        )}
        <Button type="submit" fullwidth>
          Zapisz
        </Button>
      </ButtonGroup>
    </form>
  );
}

AddIngredient.propTypes = {
  onSubmit: propTypes.func,
  deleteIngredient: propTypes.func,
  ingredientToEdit: propTypes.shape({
    id: propTypes.string,
    name: propTypes.string,
    amount: propTypes.number,
    measurement: propTypes.string,
  }),
};

export default AddIngredient;
