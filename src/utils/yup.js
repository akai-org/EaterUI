import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Pole ${label} jest wymagane.",
  },
  number: {
    moreThan: "Pole ${label} musi mieć wartość większą od ${more}.",
  },
});
