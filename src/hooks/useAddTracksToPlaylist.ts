import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTracksToPlaylist } from "../apis/playlistApi";
import type { AddTracksToPlaylistResponse } from "../models/playlist";

const useAddTracksToPlaylist = (playlistId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<AddTracksToPlaylistResponse, Error, string[]>({
    mutationFn: (uris: string[]) => {
      if (!playlistId) return Promise.reject(new Error("playlistId is not defined"));
      return addTracksToPlaylist(playlistId, uris);
    },
    onSuccess: () => {
      if (!playlistId) return;
      // 관련 쿼리 무효화로 UI를 최신 상태로 갱신
      queryClient.invalidateQueries({ queryKey: ["playlist-items", { playlist_id: playlistId }] });
      queryClient.invalidateQueries({ queryKey: ["playlist-detail", playlistId] });
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useAddTracksToPlaylist;
