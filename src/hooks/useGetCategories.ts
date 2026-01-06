import { useQuery } from "@tanstack/react-query";
import { GetCategoryRequest } from "../models/category";
import useClientCredentialToken from "./useClientCredentialToken";
import { getCategories } from "../apis/categoryApi";

const useGetCategories = (params?: GetCategoryRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No Token available");
      }
      return getCategories(clientCredentialToken, params);
    },
    enabled: !!clientCredentialToken,
  });
};

export default useGetCategories;
