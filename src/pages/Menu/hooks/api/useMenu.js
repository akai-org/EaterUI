import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useMenu(startDate = "2022-05-27", endDate = "2022-05-31") {
  const request = useRequest();

  return useQuery(["menu"], () =>
    request(`/menu?startDate=${startDate}&endDate=${endDate}`),
  );
}

export default useMenu;
