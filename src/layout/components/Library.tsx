import { styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import ErrorMessage from "../../common/components/ErrorMessage";
import EmptyPlaylist from "./EmptyPlaylist";
import LazyLoading from "../../common/components/LazyLoading";

import useGetCurrentProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PlaylistUi from "./PlaylistUi";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 15, offset: 0 });
  const { data: user } = useGetCurrentProfile();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) return <EmptyPlaylist />;
  console.log("ddd", data);

  if (isLoading) {
    return <LazyLoading />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => <PlaylistUi playlists={page.items} key={index} />)}
          <div ref={ref}>{isFetchingNextPage && <LazyLoading />}</div>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;
