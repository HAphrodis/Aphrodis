"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") || "An unexpected error occurred";

  let errorMessage = "An unexpected error occurred.";
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password.";
  } else if (error === "No user found with this email") {
    errorMessage = "No user found with this email.";
  }

  return (
    <div className="error-page">
      <h1>Sign In Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
