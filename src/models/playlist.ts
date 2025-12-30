import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner, Restriction } from "./commonType";

// 공통으로 들어가는 타입들을 따로 정리한 인터페이스
export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface Copyright {
  text: string;
  type: string;
}

export interface SimplifiedArtistObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface SimplifiedAlbumObject {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restriction;
  type: "album";
  uri: string;
  artists: SimplifiedArtistObject[];
}

export interface SimplifiedShowObject {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}

export interface TrackObject {
  album: SimplifiedAlbumObject;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  // external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  // linked_from?: LinkedTrack;
  restrictions?: Restriction;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface EpisodeObject {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string; // deprecated
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  // resume_point?: ResumePoint;
  type: "episode";
  uri: string;
  restrictions?: Restriction;
  show: SimplifiedShowObject;
}
export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  };
  is_local?: boolean;
  track: TrackObject | EpisodeObject;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface Playlist extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}
