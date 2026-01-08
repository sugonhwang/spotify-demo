import { useQuery } from "@tanstack/react-query";

interface Playlist {
  id: string;
  name: string;
  images?: { url: string }[];
  owner: {
    display_name: string;
  };
}

interface PlaylistsResponse {
  items: Playlist[];
  total: number;
}

const getMyPlaylists = async (token: string): Promise<PlaylistsResponse> => {
  const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  return response.json();
};

const useGetMyPlaylists = (token: string | null) => {
  return useQuery({
    queryKey: ["myPlaylists"],
    queryFn: () => {
      if (!token) throw new Error("No token available");
      return getMyPlaylists(token);
    },
    enabled: !!token,
  });
};

export default useGetMyPlaylists;
