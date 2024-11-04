import { getCookies, setCookie } from "@std/http/cookie";
import { FreshContext } from "fresh";

export type TokenData = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

export const getSpotifyToken = async (ctx: FreshContext) => {
  const rawToken = getCookies(ctx.req.headers).spotifyToken;
  if (!rawToken) {
    return null;
  }
  return await refreshSpotifyToken(ctx.url.origin, rawToken);
};
export const setTokenCookie = (headers: Headers, tokenData: TokenData) =>
  setCookie(headers, {
    name: "spotifyToken",
    path: "/",
    value: encodeURIComponent(JSON.stringify(tokenData)),
    maxAge: 400 * 24 * 60 * 60,
  });

export const refreshSpotifyToken = async (
  origin: string,
  rawToken: string,
) => {
  const token = JSON.parse(
    decodeURIComponent(rawToken),
  );

  if (!token.expires_at || Date.now() >= token.expires_at) {
    const response = await fetch(
      `${origin}/api/spotify/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: token.refresh_token }),
      },
    );

    if (!response.ok) {
      console.error("Failed to refresh token", response);
      return null;
    }

    return await response.json();
  }

  return token;
};
