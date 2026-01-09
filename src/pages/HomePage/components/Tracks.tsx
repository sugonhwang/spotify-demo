import { Grid2, Typography } from "@mui/material";
import useGetFeaturedTracks from "../../../hooks/useGetFeaturedTracks";
import LazyLoading from "../../../common/components/LazyLoading";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const Tracks = () => {
  const { data, error, isLoading } = useGetFeaturedTracks(6); // limit을 6으로 명시

  if (isLoading) {
    return <LazyLoading />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        TRACKS
      </Typography>

      {data && data.tracks.items.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.tracks.items.map((track) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
              <Card image={track.album.images[0]?.url} name={track.name} artistName={track.artists.map((artist) => artist.name).join(", ")} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default Tracks;
