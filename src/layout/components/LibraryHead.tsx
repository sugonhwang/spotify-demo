import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, styled, Typography } from "@mui/material";

const Head = styled("div")({
  display: "flex",
  padding: "8px",
  justifyContent: "space-between",
});

const LibraryHead = () => {
  const handleAddLibrary = () => {};
  return (
    <div>
      <Head>
        <Box display="flex">
          <BookmarkIcon sx={{ marginRight: "40px" }} />
          <Typography variant="h2" fontWeight={700} sx={{ marginTop: "4px" }}>
            Your Library
          </Typography>
        </Box>
        <div>
          <Button onClick={handleAddLibrary}>
            <AddIcon color="success" />
          </Button>
        </div>
      </Head>
    </div>
  );
};

export default LibraryHead;
