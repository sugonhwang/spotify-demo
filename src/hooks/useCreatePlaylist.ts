import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlayList } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (!user?.id) {
        return Promise.reject(new Error("user is not defined"));
      }
      return createPlayList(user.id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlaylist;
