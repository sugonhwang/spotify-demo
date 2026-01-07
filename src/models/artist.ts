import { ExternalUrls, Image, Followers } from "./commonType";

export interface Artist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
  // Spotify Search Artist 객체는 images 배열을 포함합니다
  images?: Image[];
  followers?: Followers;
}
