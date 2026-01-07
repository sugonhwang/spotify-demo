import { useInfiniteQuery } from "@tanstack/react-query";
import SearchItemsByKeyword from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) throw new Error("no token available");
      return SearchItemsByKeyword(clientCredentialToken, { ...params, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (LastPage) => {
      const nextPageUrl = LastPage.tracks?.next || LastPage.artists?.next || LastPage.albums?.next || LastPage.playlists?.next || LastPage.shows?.next || LastPage.episodes?.next || LastPage.audiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useSearchItemsByKeyword;
