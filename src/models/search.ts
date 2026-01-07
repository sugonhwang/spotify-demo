import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedAudioBook, SimplifiedEpisode, SimplifiedPlaylist, SimplifiedShowObject, TrackObject } from "./playlist";

export enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
  Artist = "artist",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse {
  // Spotify API returns plural keys (albums, artists, playlists...)
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<TrackObject>;
  playlists?: ApiResponse<SimplifiedPlaylist>;
  shows?: ApiResponse<SimplifiedShowObject>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks?: ApiResponse<SimplifiedAudioBook>;
}
