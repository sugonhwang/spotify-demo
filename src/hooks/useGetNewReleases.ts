import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
  // token이 있어야 API 호출이 가능하므로 token을 가져와야 함
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No token available"); // clientCredentialToken이 undefined의 대한 use case 처리 필요
      }

      return getNewReleases(clientCredentialToken);
    },
    enabled: !!clientCredentialToken, // 토큰이 있을 때만 API 호출
  });
};

export default useGetNewReleases;
