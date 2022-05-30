import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useMenuDetails(date) {
  const request = useRequest();

  return useQuery(["menu", date], () => request(`/menu/details?date=${date}`));
}

export default useMenuDetails;
