import { useQuery } from "react-query";
import request from "@/api/request";

function useRecipes() {
  return useQuery("recipes", () => request("/recipes"));
}

export default useRecipes;
