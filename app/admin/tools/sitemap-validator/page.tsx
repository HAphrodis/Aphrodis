"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ExternalLink } from "lucide-react";

export default function SitemapValidator() {
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [results, setResults] = useState<
    {
      url: string;
      status: number;
      lastmod?: string;
      priority?: number;
      changefreq?: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    total: number;
    valid: number;
    invalid: number;
    redirects: number;
  } | null>(null);

  const validateSitemap = async () => {
    if (!sitemapUrl.trim()) return;

    setLoading(true);
    setResults([]);
    setError(null);
    setStats(null);

    try {
      const formattedUrl = sitemapUrl.startsWith("http")
        ? sitemapUrl
        : `https://${sitemapUrl}`;

      // Fetch the sitemap
      const response = await fetch(formattedUrl);
      const text = await response.text();

      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");

      // Check for parsing errors
      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        setError("Invalid XML: " + parserError.textContent);
        setLoading(false);
        return;
      }

      // Get all URLs from sitemap
      const urlElements = xmlDoc.querySelectorAll("url");

      if (urlElements.length === 0) {
        setError("No URLs found in sitemap");
        setLoading(false);
        return;
      }

      const urls = [];

      // Extract URLs and metadata
      for (const urlElement of urlElements) {
        const locElement = urlElement.querySelector("loc");
        if (locElement && locElement.textContent) {
          const url = locElement.textContent;

          // Extract optional elements
          const lastmodElement = urlElement.querySelector("lastmod");
          const priorityElement = urlElement.querySelector("priority");
          const changefreqElement = urlElement.querySelector("changefreq");

          urls.push({
            url,
            lastmod: lastmodElement?.textContent || undefined,
            priority: priorityElement?.textContent
              ? Number.parseFloat(priorityElement.textContent)
              : undefined,
            changefreq: changefreqElement?.textContent || undefined,
          });
        }
      }

      // Check first 10 URLs
      const urlsToCheck = urls.slice(0, 10);
      const results = [];

      let validCount = 0;
      let invalidCount = 0;
      let redirectCount = 0;

      for (const urlData of urlsToCheck) {
        try {
          const response = await fetch(urlData.url, { method: "HEAD" });

          if (response.status >= 200 && response.status < 300) {
            validCount++;
          } else if (response.status >= 300 && response.status < 400) {
            redirectCount++;
          } else {
            invalidCount++;
          }

          results.push({
            ...urlData,
            status: response.status,
          });
        } catch (error) {
          console.error(`Error fetching ${urlData.url}:`, error);
          results.push({
            ...urlData,
            status: 0,
          });
          invalidCount++;
        }
      }

      setResults(results);
      setStats({
        total: urls.length,
        valid: validCount,
        invalid: invalidCount,
        redirects: redirectCount,
      });
    } catch (error) {
      console.error("Error fetching or parsing sitemap:", error);
      setError("Failed to fetch or parse sitemap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">Sitemap Validator</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Validate Sitemap</CardTitle>
          <CardDescription>
            Enter your sitemap URL to validate it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="https://www.hezain.org/sitemap.xml"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
            />
            <Button
              onClick={validateSitemap}
              disabled={loading || !sitemapUrl.trim()}
            >
              {loading ? "Validating..." : "Validate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-6 border-red-200">
          <CardHeader className="text-red-500">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={18} />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {stats && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sitemap Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-md text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total URLs</p>
              </div>
              <div className="p-4 bg-green-50 rounded-md text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.valid}
                </p>
                <p className="text-sm text-green-600">Valid URLs</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-md text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.redirects}
                </p>
                <p className="text-sm text-yellow-600">Redirects</p>
              </div>
              <div className="p-4 bg-red-50 rounded-md text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats.invalid}
                </p>
                <p className="text-sm text-red-600">Invalid URLs</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Only checked the first 10 URLs. Your sitemap has{" "}
              {stats.total} URLs in total.
            </p>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>URL Check Results</CardTitle>
            <CardDescription>
              Showing results for the first 10 URLs in your sitemap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md divide-y">
              {results.map((result, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="max-w-md">
                      <p className="font-medium truncate">{result.url}</p>
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
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        <span className="sr-only">Open URL</span>
                      </a>
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {result.lastmod && (
                      <div>
                        <p className="text-xs font-medium">Last Modified:</p>
                        <p className="text-sm">{result.lastmod}</p>
                      </div>
                    )}

                    {result.priority !== undefined && (
                      <div>
                        <p className="text-xs font-medium">Priority:</p>
                        <p className="text-sm">{result.priority}</p>
                      </div>
                    )}

                    {result.changefreq && (
                      <div>
                        <p className="text-xs font-medium">Change Frequency:</p>
                        <p className="text-sm">{result.changefreq}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
