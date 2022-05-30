import { useQuery } from "react-query";
import { showErrorToast } from "@/utils/toast";
import { useRequest } from "@/utils/auth";

function useRecipes() {
  const request = useRequest();

  return useQuery("recipes", () => request("/recipes"), {
    onError: () => {
      showErrorToast("Nie udało się pobrać przepisów");
    },
  });
}

export default useRecipes;
