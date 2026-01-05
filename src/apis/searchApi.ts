import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { SearchRequestParams, SearchResponse } from "../models/search";

const searchItemsByKeyword = async (token: string, params: SearchRequestParams): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external) searchParams.append("include_external", params.include_external);
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }); // api.ts를 안쓰고 axios를 쓰는 이유? 로그인을 하지 않아도 검색 기능은 사용이 가능해야하므로
    return response.data;
  } catch {
    throw new Error("Failed to Search by Keyword");
  }
};

export default searchItemsByKeyword;
