import { useQuery } from "react-query";
import request from "@/api/request";

function useMenu(startDate = "2022-05-27", endDate = "2022-05-31") {
  return useQuery(["menu"], () =>
    request(`/menu?startDate=${startDate}&endDate=${endDate}`),
  );
}

export default useMenu;
