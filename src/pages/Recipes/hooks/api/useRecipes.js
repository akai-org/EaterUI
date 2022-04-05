import { useQuery } from "react-query";
import request from "@/api/request";
import { ToastError } from "@/utils/toast"

function useRecipes() {
  return useQuery("recipes", () => request("/recipes"), {
    onError: () => {
      ToastError("Nie udało się pobrać przepisów");
    }
  });
}

export default useRecipes;
