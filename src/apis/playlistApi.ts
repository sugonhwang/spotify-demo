import { CreatePlaylistRequest, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist } from "../models/playlist";
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

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch playlist detail", error);
    throw error;
  }
};

export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch playlist items", error);
    throw error;
  }
};

export const createPlayList = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch {
    throw new Error("fail to create playlist");
  }
};
