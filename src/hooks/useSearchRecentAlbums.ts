import { useQuery } from "@tanstack/react-query";
import { searchRecentAlbums, SearchAlbumsResponse } from "../apis/trackAlbumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchRecentAlbums = (limit: number = 6) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SearchAlbumsResponse>({
    queryKey: ["recent-albums", limit],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return searchRecentAlbums(clientCredentialToken, limit);
    },
    enabled: !!clientCredentialToken,
  });
};

export default useSearchRecentAlbums;
