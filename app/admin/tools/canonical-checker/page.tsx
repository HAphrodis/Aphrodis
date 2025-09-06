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
import { AlertCircle, CheckCircle } from "lucide-react";

export default function CanonicalChecker() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<
    {
      url: string;
      canonical: string | null;
      status: number;
      issues: string[];
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const checkCanonicals = async () => {
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
        const issues = [];

        const response = await fetch(formattedUrl);
        const html = await response.text();

        // Create a DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Get canonical URL
        const canonicalElement = doc.querySelector('link[rel="canonical"]');
        const canonical = canonicalElement
          ? canonicalElement.getAttribute("href")
          : null;

        // Check for issues
        if (!canonical) {
          issues.push("Missing canonical URL");
        } else {
          // Check if canonical is absolute URL
          if (!canonical.startsWith("http")) {
            issues.push("Canonical URL is not absolute");
          }

          // Check if canonical matches current URL (ignoring trailing slashes)
          const normalizedUrl = formattedUrl.replace(/\/$/, "");
          const normalizedCanonical = canonical.replace(/\/$/, "");

          if (normalizedUrl !== normalizedCanonical) {
            issues.push("Canonical URL does not match current URL");
          }
        }

        results.push({
          url: formattedUrl,
          canonical,
          status: response.status,
          issues,
        });
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        results.push({
          url,
          canonical: null,
          status: 0,
          issues: ["Failed to fetch URL"],
        });
      }
    }

    setResults(results);
    setLoading(false);
  };

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">Canonical URL Checker</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Check Canonical URLs</CardTitle>
          <CardDescription>
            Enter one URL per line to check canonical URLs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="https://www.hezain.org/about
https://www.hezain.org/programs"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="min-h-[150px] mb-4"
          />
          <Button onClick={checkCanonicals} disabled={loading || !urls.trim()}>
            {loading ? "Checking..." : "Check Canonicals"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Canonical URLs help prevent duplicate content issues by telling
              search engines which version of a page is the preferred one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md divide-y">
              {results.map((result, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium truncate max-w-md">
                        {result.url}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Status:
                        <span
                          className={`ml-1 ${
                            result.status >= 200 && result.status < 300
                              ? "text-green-500"
                              : result.status >= 300 && result.status < 400
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {result.status === 0
                            ? "Connection Error"
                            : result.status}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      {result.issues.length === 0 ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium">Canonical URL:</p>
                    <p className="p-2 bg-muted rounded-md text-sm mt-1 break-all">
                      {result.canonical || "None found"}
                    </p>
                  </div>

                  {result.issues.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-red-500">
                        Issues:
                      </p>
                      <ul className="list-disc list-inside text-sm mt-1 text-red-500">
                        {result.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
