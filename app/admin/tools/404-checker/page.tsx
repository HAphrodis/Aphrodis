"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFoundChecker() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<{ url: string; status: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const checkUrls = async () => {
    if (!urls.trim()) return;

    setLoading(true);
    setResults([]);

    const urlList = urls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const results = [];

    for (const url of urlList) {
      try {
        const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
        const response = await fetch(formattedUrl, { method: "HEAD" });
        results.push({ url: formattedUrl, status: response.status });
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        results.push({ url, status: 0 }); // Connection error
      }
    }

    setResults(results);
    setLoading(false);
  };

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">404 Not Found Checker</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Check URLs</CardTitle>
          <CardDescription>
            Enter one URL per line to check if they return 404 errors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="https://www.hezain.org/example-page
https://www.hezain.org/another-page"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="min-h-[150px] mb-4"
          />
          <Button onClick={checkUrls} disabled={loading || !urls.trim()}>
            {loading ? "Checking..." : "Check URLs"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Status codes: 200-299 = Success, 300-399 = Redirect, 400-499 =
              Client Error, 500-599 = Server Error
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md divide-y">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-3 flex justify-between items-center"
                >
                  <span className="truncate mr-4 max-w-md">{result.url}</span>
                  <span
                    className={`font-medium ${
                      result.status === 0
                        ? "text-red-500"
                        : result.status >= 200 && result.status < 300
                          ? "text-green-500"
                          : result.status >= 300 && result.status < 400
                            ? "text-yellow-500"
                            : "text-red-500"
                    }`}
                  >
                    {result.status === 0
                      ? "Connection Error"
                      : `Status: ${result.status}`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
