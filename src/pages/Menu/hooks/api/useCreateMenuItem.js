import { useMutation } from "react-query";
import queryClient from "@/queryClient";
import { useRequest } from "@/utils/auth";
import { showErrorToast } from "@/utils/toast";

function useCreateMenuItem() {
  const request = useRequest();

  return useMutation(
    (menuItemData) => request("/menu", { method: "POST", body: menuItemData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menu");
      },
      onError: () => {
        showErrorToast("Nie udało się dodać przepisu do menu");
      },
    },
  );
}

export default useCreateMenuItem;
