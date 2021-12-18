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

function AddIngredient({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/recipe/new");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text size="h3">Dodaj składnik</Text>
      <Input
        label="Nazwa"
        {...register("name")}
        errorMessage={errors?.name?.message}
      />
      <Input
        {...register("amount", { valueAsNumber: true })}
        label="Ilość"
        type="number"
        errorMessage={errors?.amount?.message}
      />
      <Input
        label="Miara"
        {...register("measurement")}
        errorMessage={errors?.measurement?.message}
      />
      <ButtonGroup>
        <Button
          type="reset"
          variant="secondary"
          fullwidth
          onClick={handleBackButtonClick}
        >
          Cofnij
        </Button>
        <Button type="submit" fullwidth>
          Zapisz
        </Button>
      </ButtonGroup>
    </form>
  );
}

AddIngredient.propTypes = {
  onSubmit: propTypes.func,
};

export default AddIngredient;
