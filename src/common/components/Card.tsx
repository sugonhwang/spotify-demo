import { Box, styled, Typography } from "@mui/material";
import PlayButton from "./PlayButton";

export const CardGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "24px",
  padding: "16px 0",
  // 반응형 조건: 모바일 2, 태블릿 3, 데스크탑 6
  gridTemplateColumns: "repeat(2, 1fr)",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(6, 1fr)",
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "transparent", // 기본은 투명
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    // theme.ts의 action.hover (#282828) 사용
    backgroundColor: theme.palette.action.hover,
    "& .play-button": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const ImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  aspectRatio: "1/1",
  marginBottom: "16px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
  },
});

interface CardProps {
  image: string;
  name: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <ImageWrapper>
        <img src={image} alt={name} />
        <PlayButton />
      </ImageWrapper>
      {/* theme.ts의 h2 스타일 적용 */}
      <Typography variant="h2" fontWeight={700} noWrap sx={{ mb: 1 }}>
        {name}
      </Typography>
      {/* theme.ts의 subtitle1 및 text.secondary 적용 */}
      <Typography variant="subtitle1" color="text.secondary" noWrap>
        {artistName}
      </Typography>
    </CardContainer>
  );
};

export default Card;
