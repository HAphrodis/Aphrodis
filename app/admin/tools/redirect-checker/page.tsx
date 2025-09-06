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
import { ChevronRight } from "lucide-react";

export default function RedirectChecker() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<
    { url: string; redirectChain: string[]; finalStatus: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const checkRedirects = async () => {
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
        const redirectChain = [];
        let currentUrl = formattedUrl;
        let finalStatus = 0;
        let maxRedirects = 10; // Prevent infinite loops

        while (maxRedirects > 0) {
          redirectChain.push(currentUrl);

          try {
            const response = await fetch(currentUrl, {
              method: "HEAD",
              redirect: "manual", // Don't automatically follow redirects
            });

            finalStatus = response.status;

            if (response.status >= 300 && response.status < 400) {
              const location = response.headers.get("location");
              if (location) {
                // Handle relative URLs
                currentUrl = location.startsWith("/")
                  ? new URL(location, currentUrl).href
                  : location;
                maxRedirects--;
                continue;
              }
            }

            break;
          } catch (error) {
            console.error(`Error fetching ${currentUrl}:`, error);
            finalStatus = 0;
            break;
          }
        }

        results.push({ url: formattedUrl, redirectChain, finalStatus });
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        results.push({ url, redirectChain: [url], finalStatus: 0 });
      }
    }

    setResults(results);
    setLoading(false);
  };

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">Redirect Chain Checker</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Check Redirect Chains</CardTitle>
          <CardDescription>
            Enter one URL per line to check for redirect chains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="https://www.hezain.org/old-page
https://www.hezain.org/another-old-page"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="min-h-[150px] mb-4"
          />
          <Button onClick={checkRedirects} disabled={loading || !urls.trim()}>
            {loading ? "Checking..." : "Check Redirects"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Redirect chains should be as short as possible. Multiple redirects
              slow down page loading and waste crawl budget.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md divide-y">
              {results.map((result, index) => (
                <div key={index} className="p-4">
                  <p className="font-medium">Original URL: {result.url}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Redirect chain length: {result.redirectChain.length}
                  </p>
                  {result.redirectChain.length > 1 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200">
                      {result.redirectChain.map((url, idx) => (
                        <div key={idx} className="flex items-center mb-2">
                          <span className="text-sm truncate max-w-md">
                            {url}
                          </span>
                          {idx < result.redirectChain.length - 1 && (
                            <ChevronRight
                              className="mx-2 text-gray-400"
                              size={16}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 font-medium">
                    Final status:
                    <span
                      className={`ml-2 ${
                        result.finalStatus >= 200 && result.finalStatus < 300
                          ? "text-green-500"
                          : result.finalStatus >= 300 &&
                              result.finalStatus < 400
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {result.finalStatus === 0
                        ? "Connection Error"
                        : result.finalStatus}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
