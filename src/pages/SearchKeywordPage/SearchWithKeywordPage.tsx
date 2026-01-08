import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Container, Grid, InputAdornment, TextField, Typography, IconButton, TableBody, TableCell, TableContainer, TableRow, styled, Alert, Snackbar, Menu, MenuItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LazyLoading from "../../common/components/LazyLoading";
import PlayButton from "../../common/components/PlayButton";
import Card from "../../common/components/Card";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import ArtistCard from "./components/ArtistCard";
import { TrackObject } from "../../models/playlist";
import useAddTracksToPlaylist from "../../hooks/useAddTracksToPlaylist";
import useGetMyPlaylists from "../../hooks/useGetMyPlaylists";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .add-button": {
    opacity: 1,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

const SearchWithKeywordPage = () => {
  const { keyword: routeKeyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>(routeKeyword ?? "");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackObject | null>(null);
  const [targetPlaylistId, setTargetPlaylistId] = useState<string | undefined>(undefined);

  // 사용자 Access Token (localStorage에서 직접 가져오기)
  const accessToken = localStorage.getItem("access_token");
  const { data: playlistsData, isLoading: isLoadingPlaylists } = useGetMyPlaylists(accessToken || "");
  const addTracksMutation = useAddTracksToPlaylist(targetPlaylistId);

  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: routeKeyword ?? "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    limit: 12,
    market: "KR",
  });

  const tracks = useMemo(() => data?.pages.flatMap((p) => p.tracks?.items ?? []) ?? [], [data]);

  const artists = useMemo(() => {
    const items = data?.pages.flatMap((p) => p.artists?.items ?? []) ?? [];
    const validArtists = items.filter((a) => !!a?.id && !!a?.name);
    const uniqueMap = new Map(validArtists.map((a) => [a.id, a]));
    return Array.from(uniqueMap.values());
  }, [data]);

  const albums = useMemo(() => data?.pages.flatMap((p) => p.albums?.items ?? []) ?? [], [data]);

  const topTrack = tracks[0];

  // targetPlaylistId가 변경되고 selectedTrack이 있을 때 mutation 실행
  useEffect(() => {
    if (targetPlaylistId && selectedTrack?.uri) {
      addTracksMutation.mutate([selectedTrack.uri], {
        onSuccess: () => {
          setSnackbarMessage(`"${selectedTrack.name}"이(가) 플레이리스트에 추가되었습니다.`);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        },
        onError: (err: unknown) => {
          const message = err instanceof Error ? err.message : "트랙 추가에 실패했습니다.";
          setSnackbarMessage(message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        },
        onSettled: () => {
          setTargetPlaylistId(undefined);
          setSelectedTrack(null);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPlaylistId]);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed.length > 0) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClearInput = () => {
    setKeyword("");
  };

  const handleOpenPlaylistMenu = (event: React.MouseEvent<HTMLElement>, track: TrackObject) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrack(track);
  };

  const handleClosePlaylistMenu = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = (playlistId: string) => {
    handleClosePlaylistMenu();
    setTargetPlaylistId(playlistId);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Container maxWidth="lg">
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

        {isLoading && <LazyLoading />}
        {error && <Typography color="error">검색 중 오류가 발생했습니다. 다시 시도해주세요.</Typography>}

        {!isLoading && !error && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
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
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Songs
                </Typography>
                <StyledTableContainer>
                  <TableBody sx={{ width: "100%" }}>
                    {tracks.slice(0, 5).map((track) => (
                      <StyledTableRow key={track.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box>
                              <AlbumImage src={track.album?.images?.[0]?.url} width="40px" />
                            </Box>
                            <Box>
                              <Typography fontWeight={700}>{track.name}</Typography>
                              <Typography color="text.secondary">{track.artists ? track.artists.map((a) => a.name).join(", ") : "Unknown Artist"}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{track.album?.name}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            className="add-button"
                            onClick={(e) => handleOpenPlaylistMenu(e, track)}
                            sx={{
                              opacity: 0,
                              transition: "opacity 0.2s",
                              color: "text.secondary",
                              "&:hover": {
                                color: "common.white",
                              },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTableContainer>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, mx: -3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, px: 3 }}>
                Artists
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  px: 3,
                  pb: 2,
                  "&::-webkit-scrollbar": {
                    height: 10,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                    borderRadius: 5,
                  },
                  "&:hover::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {artists.length > 0 ? artists.slice(0, 6).map((artist) => <ArtistCard key={artist.id} image={artist.images?.[0]?.url ?? ""} name={artist.name ?? "Unknown Artist"} />) : <Typography color="text.secondary">아티스트가 없습니다.</Typography>}
              </Box>
            </Box>

            <Box sx={{ mt: 4, mx: -3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, px: 3 }}>
                Albums
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  px: 3,
                  pb: 2,
                  "&::-webkit-scrollbar": {
                    height: 10,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                    borderRadius: 5,
                  },
                  "&:hover::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {albums.length > 0 ? (
                  albums.slice(0, 6).map((album) => (
                    <Box key={album.id} sx={{ width: 192, flexShrink: 0 }}>
                      <Card image={album.images?.[0]?.url ?? ""} name={album.name} artistName={album.artists?.map((a) => a.name).join(", ")} />
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">앨범이 없습니다.</Typography>
                )}
              </Box>
            </Box>
          </>
        )}

        <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClosePlaylistMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              maxHeight: 400,
              width: 250,
              backgroundColor: "#282828",
              color: "white",
              mt: 1,
            },
          }}
        >
          {isLoadingPlaylists ? (
            <MenuItem disabled>
              <ListItemText primary="로딩 중..." />
            </MenuItem>
          ) : playlistsData?.items && playlistsData.items.length > 0 ? (
            playlistsData.items.map((playlist) => (
              <MenuItem
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                sx={{
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={playlist.name}
                  secondary={playlist.owner.display_name}
                  secondaryTypographyProps={{
                    sx: { color: "text.secondary" },
                  }}
                />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <ListItemText primary="플레이리스트가 없습니다" />
            </MenuItem>
          )}
        </Menu>
      </Container>
    </Box>
  );
};

export default SearchWithKeywordPage;
