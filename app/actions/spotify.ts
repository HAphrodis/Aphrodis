"use server";

import { cookies } from "next/headers";

// Exchange authorization code for access and refresh tokens
export async function exchangeCodeForTokens(code: string): Promise<boolean> {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // Use the callback URL for token exchange
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!.replace(
      "/spotify",
      "/callback",
    );

    // Create the authorization header
    const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Token exchange error:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("Token exchange successful");

    // Store tokens in cookies
    const cookieStore = await cookies();

    // Store access token (short-lived)
    cookieStore.set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data.expires_in,
      path: "/",
    });

    // Store refresh token (long-lived)
    cookieStore.set("spotify_refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return true;
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return false;
  }
}

// Refresh the access token using the refresh token
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("spotify_refresh_token")?.value;

    if (!refreshToken) {
      return null;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // Create the authorization header
    const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Update the access token in cookies
    cookieStore.set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
    });

    // If a new refresh token is provided, update it
    if (data.refresh_token) {
      cookieStore.set("spotify_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    return data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

// Get the currently playing track
export async function getCurrentlyPlaying() {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("spotify_access_token")?.value;

    // If no access token, try to refresh it
    if (!accessToken) {
      const refreshedToken = await refreshAccessToken();
      if (!refreshedToken) {
        return null;
      }
      accessToken = refreshedToken;
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    // If token expired, refresh and try again
    if (response.status === 401) {
      const refreshedToken = await refreshAccessToken();
      if (!refreshedToken) {
        return null;
      }
      accessToken = refreshedToken;

      const retryResponse = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        },
      );

      if (!retryResponse.ok) {
        return null;
      }

      // No content means nothing is playing
      if (retryResponse.status === 204) {
        return { isPlaying: false };
      }

      return await retryResponse.json();
    }

    // No content means nothing is playing
    if (response.status === 204) {
      return { isPlaying: false };
    }

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting currently playing track:", error);
    return null;
  }
}
