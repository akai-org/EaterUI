import { useQuery } from "react-query";
import request from "@/api/request";
import { showErrorToast } from "@/utils/toast";

function useRecipes() {
  return useQuery("recipes", () => request("/recipes"), {
    onError: () => {
      showErrorToast("Nie udało się pobrać przepisów");
    },
  });
}

export default useRecipes;
