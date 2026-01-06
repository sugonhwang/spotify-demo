import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import useGetCategories from "../../hooks/useGetCategories";
import { Box, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LazyLoading from "../../common/components/LazyLoading";
import CategoryCard from "./components/CategoryCard";

/**
 * 랜덤 색상 생성 함수 (컴포넌트 외부에 정의)
 * - 컴포넌트 외부에서 정의되어 렌더링과 무관하게 실행 가능
 * - Math.random()을 사용해도 React 규칙 위반 없음
 *
 * @param colors - 색상 배열
 * @returns 랜덤하게 선택된 색상
 */
const getRandomColor = (colors: string[]): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const SearchPage = () => {
  // API 호출: Spotify 카테고리 목록 가져오기
  const { data, isLoading, error } = useGetCategories({ country: "KR", limit: 12 });
  const navigate = useNavigate();

  // 카테고리 카드에 사용할 배경 색상 팔레트
  const colors = ["#5B2C6F", "#F7DC6F", "#E75480", "#C19A6B", "#A2E3E2", "#FFF275"];

  /**
   * 카테고리별 랜덤 색상 매핑을 저장하는 state
   * - lazy initialization으로 초기 렌더링 시에만 실행
   * - 빈 객체로 시작하여 필요할 때 색상 추가
   */
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  /**
   * 카테고리 ID에 대한 색상을 가져오는 함수
   * - 이미 할당된 색상이 있으면 반환
   * - 없으면 새로운 랜덤 색상 생성 후 state 업데이트
   * - useCallback으로 메모이제이션하여 불필요한 재생성 방지
   */
  const getColorForCategory = useCallback(
    (categoryId: string): string => {
      // 이미 색상이 할당되어 있으면 반환
      if (colorMap[categoryId]) {
        return colorMap[categoryId];
      }

      // 새로운 랜덤 색상 생성 (컴포넌트 외부 함수 호출)
      const newColor = getRandomColor(colors);

      // state 업데이트 (비동기적으로 처리됨)
      setColorMap((prev) => ({
        ...prev,
        [categoryId]: newColor,
      }));

      return newColor;
    },
    [colorMap]
  );

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Container maxWidth="lg">
        {/* 검색 입력 필드 */}
        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="What do you want to contents?"
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

        {/* 로딩 중일 때 로딩 컴포넌트 표시 */}
        {isLoading && <LazyLoading />}

        {/* 에러 발생 시 에러 메시지 표시 */}
        {error && <Typography color="error">카테고리 로드 실패</Typography>}

        {/* 카테고리 그리드 */}
        <Grid container spacing={2}>
          {data?.categories.items.map((cat) => {
            // 각 카테고리에 대한 색상 가져오기
            // 처음 렌더링될 때 랜덤 색상이 할당되고, 이후에는 같은 색상 유지
            const bgColor = getColorForCategory(cat.id);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
                <CategoryCard id={cat.id} name={cat.name} iconUrl={cat.icons[0]?.url} bgColor={bgColor} onClick={(id) => navigate(`/search?category=${id}`)} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
