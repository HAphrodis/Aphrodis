"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkAuthStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token");
  const refreshToken = cookieStore.get("spotify_refresh_token");

  return !!(accessToken || refreshToken);
}

export async function logout() {
  const cookieStore = await cookies();

  // Clear the auth cookies
  cookieStore.delete("spotify_access_token");
  cookieStore.delete("spotify_refresh_token");

  // Redirect to the spotify page
  redirect("/spotify");
}

export async function login() {
  const redirectUri = encodeURIComponent("http://localhost:3000/api/callback");
  const scopes = encodeURIComponent("user-read-private user-read-email");

  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}`;
}
