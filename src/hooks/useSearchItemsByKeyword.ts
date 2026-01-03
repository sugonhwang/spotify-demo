import { LastPage } from "@mui/icons-material";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearchItemsByKeyword = (params) => {
  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => {
      return searchItemsByKeyword(params);
    },
    initialPageParam: 0,
    getNextPageParam: (LastPage) => {},
  });
};
