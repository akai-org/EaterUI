import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useMenu({ startDate = "2022-04-01", endDate = "2022-04-07" } = {}) {
  const request = useRequest();

  return useQuery(["menu"], () =>
    request(`/menu?startDate=${startDate}&endDate=${endDate}`),
  );
}

export default useMenu;
