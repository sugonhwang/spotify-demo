import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedBase64 = (data: string): string => {
  // 환경에 따른 인코딩 방법 구분
  if (typeof window !== "undefined") {
    return btoa(data); // btoa: 각 문자가 1바이트(0~255)로 해석 가능한 문자열을 Base64로 인코딩한 ASCII 문자열 생성
  } else {
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });
    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        Authorization: `Basic ${encodedBase64(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch {
    throw new Error("Fail to fetch client Credential Token");
  }
};

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("Missing required parameters");
    }

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch {
    // console.error("error", error);
    throw new Error("fail to fetch token");
  }
};
