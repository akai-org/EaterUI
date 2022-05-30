import { useQuery } from "react-query";
import { useRequest } from "@/utils/auth";

function useMenu({ startDate, endDate }) {
  const request = useRequest();

  return useQuery(["menu"], () =>
    request(`/menu?startDate=${startDate}&endDate=${endDate}`),
  );
}

export default useMenu;
