import { Box, Typography } from "@mui/material";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface ArtistCardProps {
  image: string;
  name: string;
}

const ArtistCard = ({ image, name }: ArtistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        minWidth: 160,
        flexShrink: 0,
        cursor: "pointer",
        transition: "background-color 0.2s",
        p: 2,
        borderRadius: 1,
        backgroundColor: isHovered ? "action.hover" : "transparent",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 아티스트 이미지 (원형) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "100%", // 1:1 비율 유지
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={image || "/placeholder-artist.png"}
          alt={name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#282828",
          }}
        />

        {/* hover 시 재생 버튼 */}
        {isHovered && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#1db954",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 8px rgba(0,0,0,0.3)",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#1ed760",
                transform: "scale(1.05)",
              },
            }}
          >
            <PlayArrowIcon sx={{ color: "#000", fontSize: 28 }} />
          </Box>
        )}
      </Box>

      {/* 아티스트 이름 */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          textAlign: "center",
          mb: 0.5,
        }}
        noWrap
      >
        {name}
      </Typography>

      {/* Artist 레이블 */}
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        Artist
      </Typography>
    </Box>
  );
};

export default ArtistCard;
