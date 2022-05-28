import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";

function useCreateRecipe() {
  return useMutation(
    (shoppingData) =>
      request("/shopping-list", { method: "POST", body: shoppingData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("shopping-list");
      },
    },
  );
}

export default useCreateRecipe;
