import { Grid2, Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LazyLoading from "../../../common/components/LazyLoading";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases(); // error, isLoading을 따로 만들지 않았지만 사용 가능한 이유는 리엑트 쿼리에서 제공해주기 때문임
  console.log("ddd", data);

  if (isLoading) {
    return <LazyLoading />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>

      {data && data.albums.items.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card image={album.images[0].url} name={album.name} artistName={album.artists.map((artist) => artist.name).join(", ")} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
