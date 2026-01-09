import { Grid2, Typography } from "@mui/material";
import useSearchRecentAlbums from "../../../hooks/useSearchRecentAlbums";
import LazyLoading from "../../../common/components/LazyLoading";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";
import { SimplifiedAlbumObject } from "../../../models/playlist";

const Albums = () => {
  const { data, error, isLoading } = useSearchRecentAlbums();

  if (isLoading) {
    return <LazyLoading />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        ALBUMS
      </Typography>

      {data && data.albums.items.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.albums.items.map((album: SimplifiedAlbumObject) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card image={album.images[0]?.url || ""} name={album.name} artistName={album.artists.map((artist) => artist.name).join(", ")} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default Albums;
