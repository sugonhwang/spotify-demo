import { styled } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const StyledPlayButton = styled("button")(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  // theme.ts의 primary.main (#1ed760) 사용
  backgroundColor: theme.palette.primary.main,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000", // 재생 아이콘은 검은색
  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  opacity: 0,
  transform: "translateY(8px)",
  position: "absolute",
  bottom: "8px",
  right: "8px",
  "&:hover": {
    transform: "scale(1.05) translateY(0px)",
    filter: "brightness(1.1)",
  },
}));

const PlayButton = () => {
  return (
    <StyledPlayButton className="play-button">
      <PlayArrowIcon sx={{ fontSize: 32 }} />
    </StyledPlayButton>
  );
};

export default PlayButton;
