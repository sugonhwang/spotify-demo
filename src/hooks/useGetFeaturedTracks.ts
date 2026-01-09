import { useQuery } from "@tanstack/react-query";
import { getFeaturedTracks, SearchTracksResponse } from "../apis/trackAlbumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetFeaturedTracks = (limit: number = 6) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SearchTracksResponse>({
    queryKey: ["featured-tracks", limit],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getFeaturedTracks(clientCredentialToken, limit);
    },
    enabled: !!clientCredentialToken,
  });
};

export default useGetFeaturedTracks;
