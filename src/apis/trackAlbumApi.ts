import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { SimplifiedAlbumObject, TrackObject } from "../models/playlist";

// 트랙 검색 응답 타입
export interface SearchTracksResponse {
  tracks: {
    items: TrackObject[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
    previous: string | null;
  };
}

// 앨범 검색 응답
export interface SearchAlbumsResponse {
  albums: {
    items: SimplifiedAlbumObject[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
    previous: string | null;
  };
}

// 인기 트랙 검색으로 가져오기
export const getFeaturedTracks = async (clientCredentialToken: string, limit: number = 6): Promise<SearchTracksResponse> => {
  try {
    // 더 일반적인 검색어로 변경 (pop 장르)
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?q=genre:pop&type=track&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("fail to fetch tracks data", error);
    throw new Error("fail to fetch tracks");
  }
};

// 검색으로 최신 앨범 가져오기
export const searchRecentAlbums = async (clientCredentialToken: string, limit: number = 6): Promise<SearchAlbumsResponse> => {
  try {
    const currentYear = new Date().getFullYear();
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?q=year:${currentYear}&type=album&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("fail to fetch recent albums data", error);
    throw new Error("fail to fetch recent albums");
  }
};
