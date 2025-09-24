// lib\song.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import redisClient from "@/utils/redis";
import { refreshSpotifyAccessToken, getSpotifyAccessToken } from "@/lib/auth";

// Redis key for storing current song
const CURRENT_SONG_KEY = "spotify:current_song";
// Cache expiration time (30 seconds)
const CACHE_EXPIRY = 30;

export interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  timestamp?: number;
}

// Fetch the currently playing track from Spotify API
export async function fetchCurrentlyPlayingFromSpotify(): Promise<SpotifyTrack | null> {
  try {
    let accessToken = await getSpotifyAccessToken();

    // If no access token, try to refresh it
    if (!accessToken) {
      const refreshedToken = await refreshSpotifyAccessToken();
      if (!refreshedToken) {
        console.error("No access token available and unable to refresh");
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

    // Log the response status and body for debugging
    // console.log("Spotify API response status:", response.status)
    const responseBody = await response.text();
    // console.log("Spotify API response body:", responseBody)

    // If token expired, refresh and try again
    if (response.status === 401) {
      const refreshedToken = await refreshSpotifyAccessToken();
      if (!refreshedToken) {
        console.error("Token refresh failed");
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

      // Log the retry response status and body for debugging
      // console.log("Spotify API retry response status:", retryResponse.status)
      const retryResponseBody = await retryResponse.text();
      // console.log("Spotify API retry response body:", retryResponseBody)

      if (!retryResponse.ok) {
        console.error("Retry request failed");
        return null;
      }

      // No content means nothing is playing
      if (retryResponse.status === 204) {
        // console.log("No content - nothing is playing")
        return { isPlaying: false, timestamp: Date.now() };
      }

      const data = JSON.parse(retryResponseBody);
      return formatSpotifyData(data);
    }

    // No content means nothing is playing
    if (response.status === 204) {
      // console.log("No content - nothing is playing")
      return { isPlaying: false, timestamp: Date.now() };
    }

    if (!response.ok) {
      console.error("Initial request failed");
      return null;
    }

    const data = JSON.parse(responseBody);
    return formatSpotifyData(data);
  } catch (error) {
    console.error("Error getting currently playing track:", error);
    return null;
  }
}

// Format Spotify API response into our track format
function formatSpotifyData(data: any): SpotifyTrack {
  // console.log("Formatting Spotify data:", JSON.stringify(data, null, 2))

  if (!data || !data.is_playing) {
    // console.log("No track is currently playing")
    return { isPlaying: false, timestamp: Date.now() };
  }

  return {
    isPlaying: true,
    title: data.item?.name,
    artist: data.item?.artists?.map((artist: any) => artist.name).join(", "),
    album: data.item?.album?.name,
    albumImageUrl:
      data.item?.album?.images?.[data.item.album.images.length - 1]?.url,
    songUrl: data.item?.external_urls?.spotify,
    timestamp: Date.now(),
  };
}

// Update the current song in Redis
export async function updateCurrentSong(track: SpotifyTrack): Promise<void> {
  await redisClient.set(
    CURRENT_SONG_KEY,
    JSON.stringify(track),
    "EX",
    CACHE_EXPIRY,
  );
}

// Get the current song from Redis
export async function getCurrentSong(): Promise<SpotifyTrack | null> {
  const songData = await redisClient.get(CURRENT_SONG_KEY);

  if (!songData) {
    // If no song in Redis, fetch from Spotify and update Redis
    const track = await fetchCurrentlyPlayingFromSpotify();
    if (track) {
      await updateCurrentSong(track);
    }
    return track;
  }

  try {
    const track = JSON.parse(songData) as SpotifyTrack;

    // Check if the cached data is stale (older than CACHE_EXPIRY)
    const now = Date.now();
    if (!track.timestamp || now - track.timestamp > CACHE_EXPIRY * 1000) {
      // If stale, fetch fresh data
      const freshTrack = await fetchCurrentlyPlayingFromSpotify();
      if (freshTrack) {
        await updateCurrentSong(freshTrack);
        return freshTrack;
      }
    }

    return track;
  } catch (error) {
    console.error("Error parsing song data from Redis:", error);
    return null;
  }
}

// Force refresh the current song (for authenticated user)
export async function forceRefreshCurrentSong(): Promise<SpotifyTrack | null> {
  const track = await fetchCurrentlyPlayingFromSpotify();
  if (track) {
    await updateCurrentSong(track);
  }
  return track;
}
