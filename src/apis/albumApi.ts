import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (clientCredentialToken: string): Promise<GetNewReleasesResponse> => {
  console.log("url", SPOTIFY_BASE_URL);
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("fail to fetch new releases data", error);
    throw new Error("fail to fetch new releases");
  }
};
