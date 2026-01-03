// 개별 플레이 리스트

import PlaylistItem from "../../common/components/PlaylistItem";
import { useNavigate } from "react-router";
import { SimplifiedPlaylist } from "../../models/playlist";
import { useState } from "react";
import { Box, keyframes } from "@mui/material";

const flash = keyframes`
  0% { background-color: rgba(29, 185, 84, 0.5); }
  100% { background-color: transparent; }
`;

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
  latestId?: string | null;
}

const PlaylistUi = ({ playlists, latestId }: PlaylistProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };
  return (
    <div>
      {playlists.map((item) => {
        // 현재 아이템이 방금 생성된 아이템인지 확인
        const isNew = item.id === latestId;

        return (
          <Box
            key={item.id}
            sx={{
              borderRadius: "8px",
              mb: 0.5, // 아이템 간 간격
              // isNew일 때 패딩을 주어 배경색이 밖으로 드러나게 함
              p: isNew ? "3px" : "0px",
              animation: isNew ? `${flash} 1.5s ease-in-out` : "none",
              transition: "all 0.3s ease",
            }}
          >
            <PlaylistItem selected={selectedId === item.id} handleClick={handleItemClick} name={item.name || ""} image={(item.images && item.images[0]?.url) || null} id={item.id || ""} artistName={"Playlist •" + item.owner?.display_name} />
          </Box>
        );
      })}
    </div>
  );
};

export default PlaylistUi;
