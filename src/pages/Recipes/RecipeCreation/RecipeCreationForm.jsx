import React from "react";
import { schema } from "./formSchema";

const RecipeCreationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return <form></form>;
};

export default RecipeCreationForm;
