import * as yup from "yup";

export const recipeFormSchema = yup.object({
  name: yup.string().required().label("nazwa"),
  description: yup.string().required().label("opis"),
  graphicURL: yup.string().label("link do grafiki"),
});
