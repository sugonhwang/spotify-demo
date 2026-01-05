import { Box, InputAdornment, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LazyLoading from "../../../common/components/LazyLoading";
import { TrackObject } from "../../../models/playlist";
import SearchIcon from "@mui/icons-material/Search";

interface EmptyPlaylistWithSearchProps {
  playlistId?: string;
}

const SearchContainer = styled(Box)({
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "4px", // 입력 필드의 둥근 모서리
    backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
    color: "white", // 텍스트 색상
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // 테두리 색상 제거
    },
    "&:hover fieldset": {
      borderColor: "gray", // 마우스 호버 시 테두리 색상
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray", // 포커스 시 테두리 색상
    },
  },
}));

const EmptyPlaylistWithSearch = ({ playlistId }: EmptyPlaylistWithSearchProps) => {
  const [keyword, setKeyword] = useState<string>(""); // useState를 쓸때 keyword가 무슨 타입인지 정의해줘야함
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []).filter((track): track is TrackObject => track !== undefined) ?? [];

  const hasResults = tracks.length > 0;
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <SearchContainer>
      <Box display="inline-block">
        <Typography variant="h1" my="10px">
          Let's find something for your playlist
        </Typography>
        <StyledTextField
          value={keyword}
          autoComplete="off"
          variant="outlined"
          placeholder="Search for songs or episodes"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearchKeyword}
        />
      </Box>

      <div>
        {isLoading ? (
          <LazyLoading /> // 로딩 중일 때 스피너 표시
        ) : hasResults ? (
          <SearchResultList playlistId={playlistId} list={tracks} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
        ) : keyword === "" ? null : (
          <div>
            <Typography color="primary" fontWeight={600}>{`No Result for "${keyword}"`}</Typography>
          </div> // 검색 결과가 없을 때만 표시
        )}
      </div>
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
