import { useMutation } from "react-query";
import queryClient from "@/queryClient";
import { useRequest } from "@/utils/auth";

function useCreateRecipe() {
  const request = useRequest();

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
