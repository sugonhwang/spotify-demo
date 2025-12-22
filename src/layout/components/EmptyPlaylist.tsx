import { Button, Card, styled, Typography } from "@mui/material";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlayButton = styled(Button)({
  marginTop: "30px",
  fontWeight: "700",
});
const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography>It's easy, we'll help you</Typography>
      <CreatePlayButton variant="contained">Create playlist</CreatePlayButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;
