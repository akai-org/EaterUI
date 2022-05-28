import { useQuery } from "react-query";
import request from "@/api/request";

function useMenu({ startDate = "2022-04-01", endDate = "2022-04-07" } = {}) {
  return useQuery(["menu"], () =>
    request(`/menu?startDate=${startDate}&endDate=${endDate}`),
  );
}

export default useMenu;
