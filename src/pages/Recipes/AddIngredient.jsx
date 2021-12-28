import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import propTypes from "prop-types";
import { Button, ButtonGroup, Input, Text } from "@/components";
import { schema } from "./formSchema";

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

  const isEditing = !!ingredientToEdit;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text size="h3">{isEditing ? "Edytuj" : "Zapisz"} składnik</Text>
      {ingredientToEdit?.id && (
        <Input
          hidden
          label="Id"
          {...register("id")}
          defaultValue={ingredientToEdit.id}
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
            to="/recipe/new"
            onClick={() => deleteIngredient(ingredientToEdit.id)}
          >
            Usuń
          </Button>
        ) : (
          <Button type="reset" variant="secondary" fullwidth to="/recipes/new">
            Cofnij
          </Button>
        )}
        <Button type="submit" fullwidth>
          {isEditing ? "Edytuj" : "Zapisz"}
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
