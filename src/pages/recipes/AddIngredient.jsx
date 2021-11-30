import React from "react";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";

function AddIngredient() {
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
      .transform(function (value) {
        console.log(value);
        return Number.isNaN(value) ? 0 : value;
      })
      .moreThan(0)
      .label("ilość"),
    measurment: yup.string().required().label("miara"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => {
    console.log(1, values);
  };

  return (
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
      <button type="submit">Submit!</button>
    </form>
  );
}

export default AddIngredient;
