import { useQuery } from "react-query";
import request from "@/api/request";

function useMenuDetails(date) {
  return useQuery(["menu", date], () => request(`/menu/details?date=${date}`));
}

export default useMenuDetails;
