import { Avatar, Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

type CategoryProps = {
  id: string;
  name: string;
  iconUrl?: string;
  onClick?: (id: string) => void;
  bgColor: string;
};

const CategoryCard = ({ id, name, iconUrl, onClick, bgColor = "#181818" }: CategoryProps) => {
  return (
    <Card sx={{ borderRadius: 2, bgcolor: bgColor, color: "common.white", height: 140 }}>
      <CardActionArea
        onClick={() => onClick?.(id)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          height: "100%",
          "&:focus-visible": { outline: "2px solid rgba(255,255,255,0.12" },
        }}
        aria-label={`Open ${name}`}
      >
        <CardContent sx={{ flex: 1, p: 0 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Playlist · Topic
          </Typography>
        </CardContent>
        <Box sx={{ pl: 1 }}>{iconUrl ? <Avatar src={iconUrl} sx={{ width: 72, height: 72 }} variant="rounded" /> : <Avatar sx={{ width: 72, height: 72, bgcolor: "rgba(255,255,255,0.06" }} variant="rounded" />}</Box>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
