import { Box, Button, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { TrackObject } from "../../../models/playlist";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LazyLoading from "../../../common/components/LazyLoading";

interface SearchResultProps {
  list: TrackObject[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
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

const SearchResultList = ({ list, hasNextPage, isFetchingNextPage, fetchNextPage }: SearchResultProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);
  return (
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
              <Button>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 10 }}>
          {" "}
          {isFetchingNextPage && <LazyLoading />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;
