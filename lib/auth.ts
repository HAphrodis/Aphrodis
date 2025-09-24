/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { v4 as uuidv4 } from "uuid";
import redisClient from "@/utils/redis";
import { cookies } from "next/headers";

const OWNER_ID = "portfolio_owner"; // Unique identifier for the portfolio owner
const TOKEN_EXPIRY = 60 * 60 * 24 * 7; // 7 days in seconds
const AUTH_TOKEN_EXPIRY = 60 * 60 * 24 * 30; // 30 days

// Redis key prefixes
const REDIS_PREFIX = {
  SPOTIFY_ACCESS: "spotify:access:",
  SPOTIFY_REFRESH: "spotify:refresh:",
  CURRENT_SONG: "spotify:current_song",
};

// Store tokens in Redis
async function storeTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
) {
  console.log("Storing tokens for portfolio owner");

  try {
    // Store Spotify tokens
    await redisClient.set(
      `${REDIS_PREFIX.SPOTIFY_ACCESS}${OWNER_ID}`,
      accessToken,
      "EX",
      expiresIn,
    );
    console.log("Spotify access token stored in Redis");

    await redisClient.set(
      `${REDIS_PREFIX.SPOTIFY_REFRESH}${OWNER_ID}`,
      refreshToken,
      "EX",
      TOKEN_EXPIRY * 4, // Very long expiry for Spotify refresh token
    );
    console.log("Spotify refresh token stored in Redis");

    return true;
  } catch (error) {
    console.error("Error storing tokens:", error);
    return false;
  }
}

// Get Spotify access token from Redis
export async function getSpotifyAccessToken(): Promise<string | null> {
  return await redisClient.get(`${REDIS_PREFIX.SPOTIFY_ACCESS}${OWNER_ID}`);
}

// Get Spotify refresh token from Redis
export async function getSpotifyRefreshToken(): Promise<string | null> {
  return await redisClient.get(`${REDIS_PREFIX.SPOTIFY_REFRESH}${OWNER_ID}`);
}

// Exchange Spotify authorization code for tokens and store in Redis
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

    // Store tokens in Redis
    const success = await storeTokens(
      data.access_token,
      data.refresh_token,
      data.expires_in,
    );

    if (success) {
      // Generate and store auth token
      const authToken = uuidv4();
      await redisClient.set(
        `auth:token:${authToken}`,
        OWNER_ID,
        "EX",
        AUTH_TOKEN_EXPIRY,
      );

      // Set auth cookie
      (
        await // Set auth cookie
        cookies()
      ).set("auth_token", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: AUTH_TOKEN_EXPIRY,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return false;
  }
}

// Refresh the Spotify access token using the refresh token
export async function refreshSpotifyAccessToken(): Promise<string | null> {
  try {
    const refreshToken = await getSpotifyRefreshToken();

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

    // Update the access token in Redis
    await redisClient.set(
      `${REDIS_PREFIX.SPOTIFY_ACCESS}${OWNER_ID}`,
      data.access_token,
      "EX",
      data.expires_in,
    );

    // If a new refresh token is provided, update it
    if (data.refresh_token) {
      await redisClient.set(
        `${REDIS_PREFIX.SPOTIFY_REFRESH}${OWNER_ID}`,
        data.refresh_token,
        "EX",
        TOKEN_EXPIRY * 4,
      );
    }

    return data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

// Store the current song in Redis
export async function storeCurrentSong(songData: any): Promise<void> {
  await redisClient.set(REDIS_PREFIX.CURRENT_SONG, JSON.stringify(songData));
}

// Get the current song from Redis
export async function getCurrentSong(): Promise<any | null> {
  const songData = await redisClient.get(REDIS_PREFIX.CURRENT_SONG);
  return songData ? JSON.parse(songData) : null;
}

export async function isPortfolioOwner(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    return false;
  }

  const userId = await redisClient.get(`auth:token:${authToken}`);

  return userId === OWNER_ID;
}

export async function checkAuthStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    return false;
  }

  const userId = await redisClient.get(`auth:token:${authToken}`);

  return userId === OWNER_ID;
}
