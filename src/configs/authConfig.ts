export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_SECRET_ID;
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
export const SCOPES = "playlist-read-private user-read-private user-read-email"; // API 호출할때 마다 필요한 권한 요청시 필요함
