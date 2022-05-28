import { useMutation } from "react-query";
import request from "@/api/request";
import queryClient from "@/queryClient";
import { showErrorToast } from "@/utils/toast";

function useCreateMenuItem() {
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
