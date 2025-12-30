import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistRequest, PlaylistTrack } from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({ limit, offset }: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch current user playlists");
  }
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<PlaylistTrack> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch {
    throw new Error("fail to fetch playlist detail");
  }
};
