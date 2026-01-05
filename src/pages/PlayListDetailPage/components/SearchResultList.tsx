import { Alert, Box, Button, Snackbar, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { TrackObject } from "../../../models/playlist";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LazyLoading from "../../../common/components/LazyLoading";
import useAddTracksToPlaylist from "../../../hooks/useAddTracksToPlaylist";

interface SearchResultProps {
  list: TrackObject[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  playlistId?: string;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

const SearchResultList = ({ playlistId, list, hasNextPage, isFetchingNextPage, fetchNextPage }: SearchResultProps) => {
  const [ref, inView] = useInView();
  const [addingTrackId, setAddingTrackId] = useState<string | null>(null);
  // Snackbar 상태: 메시지, 유형, 열림 여부
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");
  const mutation = useAddTracksToPlaylist(playlistId);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const handleAdd = (track: TrackObject) => {
    if (!track.uri) return;
    setAddingTrackId(track.id);
    mutation.mutate([track.uri], {
      onSuccess: () => {
        setSnackbarMessage(`"${track.name}"이(가) 플레이리스트에 추가되었습니다.`);
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
        setAddingTrackId(null);
      },
    });
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <StyledTableContainer>
        <TableBody sx={{ width: "100%" }}>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <AlbumImage src={track.album?.images[0].url} width="40px" />
                  </Box>
                  <Box>
                    <Typography fontWeight={700}>{track.name}</Typography>
                    <Typography color="text.secondary">{track.artists ? track.artists[0].name : "Unknown Artist"}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{track.album?.name}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleAdd(track)} disabled={mutation.status === "pending" && addingTrackId === track.id}>
                  {mutation.status === "pending" && addingTrackId === track.id ? "Adding..." : "Add"}
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
          <div ref={ref} style={{ height: 10 }}>
            {" "}
            {isFetchingNextPage && <LazyLoading />}
          </div>
        </TableBody>
      </StyledTableContainer>
      <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SearchResultList;
