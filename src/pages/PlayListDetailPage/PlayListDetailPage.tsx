import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { useRef, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import LazyLoading from "../../common/components/LazyLoading";

const HEADER_COLLAPSE_POINT = 120; // 이 높이를 넘으면 헤더가 축소됨

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist, isLoading } = useGetPlaylist({
    playlist_id: id ?? "",
  });

  // 스크롤 영역을 직접 제어하기 위한 ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // 헤더가 축소 상태인지 확인
  const [collapsed, setCollapsed] = useState(false);

  // 스크롤될 때마다 호출
  const handleScroll = () => {
    const scrollTop = scrollRef.current?.scrollTop ?? 0;

    // 기준 지점을 넘었은지 여부만 저장
    setCollapsed(scrollTop > HEADER_COLLAPSE_POINT);
  };

  // id 자체가 없으면 홈으로 이동
  if (!id) return <Navigate to="/" />;

  // 데이터가 준비되기 전까지 로딩 처리
  if (isLoading || !playlist) {
    return (
      <Typography sx={{ p: 4 }}>
        <LazyLoading />
      </Typography>
    );
  }

  // 대표 이미지(없을 수도 있음)
  const imageUrl = playlist.images?.[0]?.url;

  // 소유자 이름
  const ownerName = playlist.owner?.display_name ?? "알 수 없음";

  // 팔로워 수(optional)
  const followerCount = playlist.followers.total ?? 0;

  return (
    <Box
      ref={scrollRef}
      onScroll={handleScroll}
      sx={{
        height: "100%",
        overflowY: "auto",
        px: 3,
        pt: 2,
        pb: 4,
        backgroundColor: "#121212",
      }}
    >
      {/* 상단 배너 영역 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          px: 4,
          pt: 4,
          pb: 6,
          height: collapsed ? 200 : 340,
          borderRadius: 3,
          transition: "all 0.3s ease",

          // Spotify 느낌의 상단 그라데이션
          background: `
            linear-gradient(
              180deg,
              rgba(80,80,80,0.9) 0%,
              #121212 100%
            )
          `,
        }}
      >
        {/* 플레이리스트 대표 이미지 */}
        <Avatar
          variant="square"
          src={imageUrl}
          alt={playlist.name}
          sx={{
            width: collapsed ? 160 : 232,
            height: collapsed ? 160 : 232,
            transition: "all 0.3s ease",
            boxShadow: 3,
          }}
        />

        {/* 플레이리스트 정보 영역 */}
        <Stack spacing={1}>
          <Typography variant="caption" fontWeight={700}>
            {playlist.public ? "공개 플레이리스트" : "비공개 플레이리스트"}
          </Typography>

          <Typography
            fontWeight={700}
            sx={{
              fontSize: collapsed ? 32 : 48,
              lineHeight: 1.1,
              transition: "font-size 0.3s ease",
            }}
          >
            {playlist.name}
          </Typography>

          {playlist.description && (
            <Typography variant="body2" color="text.secondary">
              {playlist.description}
            </Typography>
          )}

          <Typography variant="body2">
            <strong>{ownerName}</strong> · {playlist.tracks.total}곡 · 팔로워 {followerCount.toLocaleString()}명
          </Typography>
        </Stack>
      </Box>

      {/* 하단 영역 (추후 트랙 리스트가 들어갈 자리) */}
      <Box sx={{ height: 1000 }} />
    </Box>
  );
};

export default PlaylistDetailPage;
