import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required().label("nazwa"),
  amount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .moreThan(0)
    .label("ilość"),
  measure: yup.string().required().label("miara"),
});
