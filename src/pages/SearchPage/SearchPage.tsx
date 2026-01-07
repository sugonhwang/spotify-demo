import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import useGetCategories from "../../hooks/useGetCategories";
import { Box, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LazyLoading from "../../common/components/LazyLoading";
import CategoryCard from "./components/CategoryCard";

/**
 * 랜덤 색상 생성 함수
 * 주어진 색상 배열에서 시드 기반으로 일관된 색상을 반환
 */
const getColorFromSeed = (seed: string, colors: string[]): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading, error } = useGetCategories({ country: "KR", limit: 12 });
  const navigate = useNavigate();

  // 카테고리 카드 배경 색상 팔레트
  const colors = useMemo(() => ["#5B2C6F", "#F7DC6F", "#E75480", "#C19A6B", "#A2E3E2", "#FFF275"], []);

  /**
   * 카테고리 ID별 색상 매핑을 useMemo로 한 번에 생성
   * 렌더링 중 상태 업데이트를 방지하여 안정적인 색상 할당
   */
  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    data?.categories.items.forEach((cat) => {
      map[cat.id] = getColorFromSeed(cat.id, colors);
    });
    return map;
  }, [data?.categories.items, colors]);

  const handleSearch = () => {
    const q = keyword.trim();
    if (q.length > 0) {
      navigate(`/search/${encodeURIComponent(q)}`);
    }
  };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Container maxWidth="lg">
        {/* 검색 입력 필드 */}
        <Box sx={{ mb: 3 }}>
          <TextField
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="What do you want to listen to?"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 99,
                backgroundColor: "#121212",
                color: "common.white",
                px: 2,
              },
            }}
            sx={{ input: { color: "common.white" } }}
            aria-label="Search"
          />
        </Box>

        {/* 섹션 제목 */}
        <Typography variant="h5" sx={{ mb: 2, color: "text.primary" }}>
          Browse all
        </Typography>

        {/* 로딩 상태 */}
        {isLoading && <LazyLoading />}

        {/* 에러 상태 */}
        {error && <Typography color="error">카테고리를 불러올 수 없습니다.</Typography>}

        {/* 카테고리 그리드 */}
        <Grid container spacing={2}>
          {data?.categories.items.map((cat) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
              <CategoryCard id={cat.id} name={cat.name} iconUrl={cat.icons[0]?.url} bgColor={colorMap[cat.id]} onClick={(id) => navigate(`/search?category=${id}`)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
