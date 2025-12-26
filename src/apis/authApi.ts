import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

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
        Authorization: `Basic ${encodedBase64(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch client credential token:", error);
    throw new Error("Fail to fetch client Credential Token");
  }
};
