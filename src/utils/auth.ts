import { CLIENT_ID, REDIRECT_URI, SCOPES } from "../configs/authConfig";

import { AuthUrlParams } from "../models/auth";
import { generateRandomString, sha256, base64encode } from "./crypto";

// 로그인 관련 함수
export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed); // codeChallenge로 API Request 진행

  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URI;

  const scope = SCOPES;
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString(); // spotify 로그인 주소 오픈
  }
  // console.log("CLIENT_ID =", clientId);
};
