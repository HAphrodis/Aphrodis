"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorMessage =
    searchParams.get("message") || "An unknown error occurred";

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="mr-2 h-5 w-5" />
            Authentication Error
          </CardTitle>
          <CardDescription>
            There was a problem connecting to Spotify
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 text-destructive rounded-md mb-4">
            {errorMessage}
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Troubleshooting steps:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Make sure your Spotify account is active and valid</li>
              <li>Check that you&apos;ve approved the necessary permissions</li>
              <li>
                Verify that the redirect URI in your Spotify Developer Dashboard
                matches your application settings
              </li>
              <li>Try clearing your browser cookies and cache</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/spotify")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button onClick={() => router.refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
