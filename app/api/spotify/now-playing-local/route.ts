/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("spotify_access_token")?.value;

  if (!accessToken) {
    const refreshToken = cookieStore.get("spotify_refresh_token")?.value;
    if (!refreshToken) {
      return null;
    }

    // Refresh the token
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const response = await fetch(SPOTIFY_TOKEN_URL, {
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
    accessToken = data.access_token;

    // Update the cookies
    if (accessToken) {
      cookieStore.set("spotify_access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.expires_in,
        path: "/",
      });
    }

    if (data.refresh_token) {
      cookieStore.set("spotify_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }
  }

  return accessToken;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ isPlaying: false });
    }

    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();

    if (!data.is_playing) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: true,
      title: data.item.name,
      artist: data.item.artists.map((artist: any) => artist.name).join(", "),
      album: data.item.album.name,
      albumImageUrl:
        data.item.album.images[data.item.album.images.length - 1].url,
      songUrl: data.item.external_urls.spotify,
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return NextResponse.json({ isPlaying: false });
  }
}
