import { Navigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import LazyLoading from "../../common/components/LazyLoading";
import { PAGE_LIMIT } from "../../configs/commonConfig";

const HEADER_COLLAPSE_POINT = 120;

const PlaylistDetailPage = () => {
  // URL 파라미터
  const { id } = useParams<{ id: string }>();

  // 플레이리스트 기본 정보
  const { data: playlist, isLoading } = useGetPlaylist({
    playlist_id: id as string,
  });

  // 플레이리스트 트랙 목록 (무한 스크롤)
  const {
    data: playlistItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: id as string,
    limit: PAGE_LIMIT,
  });

  // 테이블 영역 스크롤 컨테이너
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 트리거용 sentinel
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 헤더 접힘 여부
  const [collapsed, setCollapsed] = useState(false);

  /**
   * 무한 스크롤 구현
   * - 테이블 맨 아래 sentinel이 보이면 다음 페이지 요청
   * - scroll 위치 계산 없이 브라우저가 판단
   */
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: tableScrollRef.current, // 실제 스크롤 컨테이너
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 헤더 접힘 처리 (같은 스크롤 기준 사용)
  const handleScroll = () => {
    const scrollTop = tableScrollRef.current?.scrollTop ?? 0;
    setCollapsed(scrollTop > HEADER_COLLAPSE_POINT);
  };

  // 잘못된 접근 처리
  if (!id) return <Navigate to="/" />;

  // 초기 로딩 상태
  if (isLoading || !playlist) {
    return (
      <Box sx={{ p: 4 }}>
        <LazyLoading />
      </Box>
    );
  }

  const imageUrl = playlist.images?.[0]?.url;
  const ownerName = playlist.owner?.display_name ?? "알 수 없음";
  const followerCount = playlist.followers.total ?? 0;

  return (
    <Box
      sx={{
        px: 3,
        pt: 2,
        pb: 4,
        backgroundColor: "#121212",
      }}
    >
      {/* 상단 플레이리스트 정보 영역 */}
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
          background: `
            linear-gradient(
              180deg,
              rgba(80,80,80,0.9) 0%,
              #121212 100%
            )
          `,
        }}
      >
        <Avatar
          variant="square"
          src={imageUrl}
          alt={playlist.name}
          sx={{
            width: collapsed ? 160 : 232,
            height: collapsed ? 160 : 232,
            transition: "all 0.3s ease",
          }}
        />

        <Stack spacing={1}>
          <Typography variant="caption" fontWeight={700}>
            {playlist.public ? "공개 플레이리스트" : "비공개 플레이리스트"}
          </Typography>

          <Typography
            fontWeight={700}
            sx={{
              fontSize: collapsed ? 32 : 48,
              lineHeight: 1.1,
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

      {/* 트랙 리스트 (유일한 스크롤 영역) */}
      <Box
        ref={tableScrollRef}
        onScroll={handleScroll}
        sx={{
          height: "600px",
          overflowY: "auto",
          mt: 2,
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: "none",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => <DesktopPlaylistItem key={pageIndex * PAGE_LIMIT + itemIndex} item={item} index={pageIndex * PAGE_LIMIT + itemIndex + 1} />))}

            {/* 무한 스크롤 트리거용 요소 */}
            <TableRow>
              <TableCell colSpan={5}>
                <div ref={loadMoreRef} style={{ height: 1 }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* 다음 페이지 로딩 표시 */}
        {isFetchingNextPage && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <LazyLoading />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;
