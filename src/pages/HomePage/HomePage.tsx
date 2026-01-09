import { Box } from "@mui/material";
import NewReleases from "./components/NewReleases";
import Tracks from "./components/Tracks";
import Albums from "./components/Albums";

const HomePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* New Released Albums 섹션 */}
      <NewReleases />

      {/* Tracks 섹션 */}
      <Box sx={{ mt: 4 }}>
        <Tracks />
      </Box>

      {/* Albums 섹션 */}
      <Box sx={{ mt: 4 }}>
        <Albums />
      </Box>
    </Box>
  );
};

export default HomePage;
