import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Container, Grid, InputAdornment, TextField, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LazyLoading from "../../common/components/LazyLoading";
import PlayButton from "../../common/components/PlayButton";
import Card from "../../common/components/Card";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "../PlayListDetailPage/components/SearchResultList";
import ArtistCard from "./components/ArtistCard";

const SearchWithKeywordPage = () => {
  const { keyword: routeKeyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();

  // routeKeyword를 초기값으로 사용 - URL 변경 시 컴포넌트가 리마운트되므로 자동 동기화
  const [keyword, setKeyword] = useState<string>(routeKeyword ?? "");

  // Spotify API 검색: 트랙, 아티스트, 앨범 동시 요청
  // routeKeyword 사용 - URL에 있는 검색어로 API 호출
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: routeKeyword ?? "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    limit: 12,
    market: "KR",
  });

  // 페이지 데이터를 평탄화하여 배열로 변환
  const tracks = useMemo(() => data?.pages.flatMap((p) => p.tracks?.items ?? []) ?? [], [data]);

  // Spotify API 응답 구조에 맞춰 artists (복수형) 사용
  const artists = useMemo(() => {
    const items = data?.pages.flatMap((p) => p.artists?.items ?? []) ?? [];
    // 유효한 아티스트만 필터링 및 중복 제거
    const validArtists = items.filter((a) => !!a?.id && !!a?.name);
    const uniqueMap = new Map(validArtists.map((a) => [a.id, a]));
    return Array.from(uniqueMap.values());
  }, [data]);

  const albums = useMemo(() => data?.pages.flatMap((p) => p.albums?.items ?? []) ?? [], [data]);

  const topTrack = tracks[0];

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed.length > 0) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClearInput = () => {
    setKeyword("");
  };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Container maxWidth="lg">
        {/* 검색 입력창 */}
        <Box sx={{ mb: 3 }}>
          <TextField
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="What do you want to listen to?"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
              endAdornment: keyword ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearInput} aria-label="Clear search">
                    <CloseIcon sx={{ color: "text.secondary" }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: 99,
                backgroundColor: "#121212",
                color: "common.white",
                px: 2,
              },
            }}
            sx={{ input: { color: "common.white" } }}
            aria-label="Search"
          />
        </Box>

        {/* 로딩 상태 */}
        {isLoading && <LazyLoading />}

        {/* 에러 상태 */}
        {error && <Typography color="error">검색 중 오류가 발생했습니다. 다시 시도해주세요.</Typography>}

        {/* 검색 결과 */}
        {!isLoading && !error && (
          <Grid container spacing={4}>
            {/* 왼쪽: Top result & Artists */}
            <Grid item xs={12} md={4}>
              {/* Top result */}
              <Typography variant="h5" sx={{ mb: 2 }}>
                Top result
              </Typography>
              {topTrack ? (
                <Box
                  sx={{
                    backgroundColor: "action.hover",
                    p: 2,
                    borderRadius: 1,
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "relative", mb: 2 }}>
                    <img src={topTrack.album?.images?.[0]?.url} alt={topTrack.name} style={{ width: "100%", borderRadius: 6 }} />
                    <PlayButton />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }} noWrap>
                    {topTrack.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Song • {topTrack.artists?.map((a) => a.name).join(", ")}
                  </Typography>
                </Box>
              ) : (
                <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
              )}

              {/* Artists */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Artists
                </Typography>
                <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>{artists.length > 0 ? artists.slice(0, 12).map((artist) => <ArtistCard key={artist.id} image={artist.images?.[0]?.url ?? ""} name={artist.name ?? "Unknown Artist"} />) : <Typography color="text.secondary">아티스트가 없습니다.</Typography>}</Box>
              </Box>
            </Grid>

            {/* 오른쪽: Songs & Albums */}
            <Grid item xs={12} md={8}>
              {/* Songs */}
              <Typography variant="h5" sx={{ mb: 2 }}>
                Songs
              </Typography>
              <SearchResultList list={tracks} hasNextPage={hasNextPage ?? false} isFetchingNextPage={isFetchingNextPage ?? false} fetchNextPage={fetchNextPage} />

              {/* Albums */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Albums
                </Typography>
                <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
                  {albums.length > 0 ? (
                    albums.slice(0, 12).map((album) => (
                      <Box key={album.id} sx={{ minWidth: 160, flexShrink: 0 }}>
                        <Card image={album.images?.[0]?.url ?? ""} name={album.name} artistName={album.artists?.map((a) => a.name).join(", ")} />
                      </Box>
                    ))
                  ) : (
                    <Typography color="text.secondary">앨범이 없습니다.</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SearchWithKeywordPage;
