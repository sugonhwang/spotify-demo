import { TableCell, TableRow } from "@mui/material";
import { EpisodeObject, PlaylistTrack, TrackObject } from "../../../models/playlist";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

// 타입 좁히기
const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: TrackObject | EpisodeObject): track is EpisodeObject => {
    return "description" in track;
  };

  // 날짜 포맷
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0"); // 날짜가 한자리일때 앞에 0 붙이기(ex. 2025-12-01.. )
    return `${year}-${month}-${day}`;
  };

  // 초 단위 포맷
  const formDuration = (ms: number | null | undefined): string => {
    if (!ms) return "Unknown";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`; // 초단위가 한자리 수일때 앞에 0 붙이기
  };
  return (
    <TableRow sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "No Name"}</TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
      <TableCell>{formatDate(item.added_at)}</TableCell>
      <TableCell>{formDuration(item.track.duration_ms) || "Unknown"}</TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
