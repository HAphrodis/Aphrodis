"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeCodeForTokens } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Spotify auth error:", error);
      router.push(`/error?message=${encodeURIComponent(error)}`);
      return;
    }

    if (!code) {
      console.error("No authorization code received");
      router.push("/error?message=No authorization code received");
      return;
    }

    const processCode = async () => {
      try {
        console.log("Processing authorization code");
        const success = await exchangeCodeForTokens(code);

        if (success) {
          console.log("Token exchange successful, redirecting to /spotify");
          // Force a hard refresh of the page to ensure new state is loaded
          window.location.href = "/spotify";
        } else {
          console.error("Failed to exchange authorization code for tokens");
          router.push(
            "/error?message=Failed to exchange authorization code for tokens",
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error processing code:", errorMessage);
        router.push(`/error?message=${encodeURIComponent(errorMessage)}`);
      }
    };

    processCode();
  }, [searchParams, router]);

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Processing Authentication</CardTitle>
          <CardDescription>
            Please wait while we connect to Spotify...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="mt-4 text-center text-muted-foreground">
            Authenticating your Spotify account
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ====== Callback for local spotify ======

// "use client"

// import { useEffect} from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { exchangeCodeForTokens } from "@/app/actions/spotify"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Loader2 } from "lucide-react"

// export default function CallbackPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     const code = searchParams.get("code")
//     const error = searchParams.get("error")

//     if (error) {

//       router.push(`/error?message=${encodeURIComponent(error)}`)
//       return
//     }

//     if (!code) {

//       router.push("/error?message=No authorization code received")
//       return
//     }

//     const processCode = async () => {
//       try {

//         const success = await exchangeCodeForTokens(code)

//         if (success) {

//           // Force a hard refresh of the page to ensure new state is loaded
//           window.location.href = "/spotify/local"
//         } else {

//           router.push("/error?message=Failed to exchange authorization code for tokens")
//         }
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"

//         router.push(`/error?message=${encodeURIComponent(errorMessage)}`)
//       }
//     }

//     processCode()
//   }, [searchParams, router])

//   return (
//     <div className="container flex items-center justify-center min-h-screen">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Processing Authentication</CardTitle>
//           <CardDescription>Please wait while we connect to Spotify...</CardDescription>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center py-6">
//           <Loader2 className="h-16 w-16 animate-spin text-primary" />
//           <p className="mt-4 text-center text-muted-foreground">Authenticating your Spotify account</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
