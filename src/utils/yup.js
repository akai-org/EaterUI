import { setLocale } from "yup";
import * as yup from "yup";

setLocale({
  mixed: {
    required: "Pole ${label} jest wymagane.",
  },
  number: {
    moreThan: "Pole ${label} musi mieć wartość większą od ${more}.",
  },
});

export const schema = yup.object({
  name: yup.string().required().label("nazwa"),
  amount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .moreThan(0)
    .label("ilość"),
  measurement: yup.string().required().label("miara"),
});
