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
  artist?: ApiResponse<Artist>;
  album?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<TrackObject>;
  playlist?: ApiResponse<SimplifiedPlaylist>;
  show?: ApiResponse<SimplifiedShowObject>;
  episode?: ApiResponse<SimplifiedEpisode>;
  audiobook?: ApiResponse<SimplifiedAudioBook>;
}
