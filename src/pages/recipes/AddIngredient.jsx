import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { Input } from "../../components/Input/Input";
import { Container } from "../../components/Container/Container";
import { Button } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";

function AddIngredient({ onSubmit }) {
  setLocale({
    mixed: {
      required: "Pole ${label} jest wymagane.",
    },
    number: {
      moreThan: "Pole ${label} musi mieć wartość większą od ${more}.",
    },
  });

  const schema = yup.object({
    name: yup.string().required().label("nazwa"),
    amount: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? 0 : value))
      .moreThan(0)
      .label("ilość"),
    measurment: yup.string().required().label("miara"),
  });

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
    <Container>
      <Text size="h3">Dodaj składnik</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("measurment")}
          errorMessage={errors?.measurment?.message}
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
    </Container>
  );
}

AddIngredient.propTypes = {
  onSubmit: propTypes.func,
};

export default AddIngredient;
