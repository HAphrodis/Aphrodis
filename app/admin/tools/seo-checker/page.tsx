/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ReactElement,
  ReactNode,
  ReactPortal,
  JSXElementConstructor,
  Key,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SeoChecker() {
  const [urlToCheck, setUrlToCheck] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("metadata");

  const checkUrl = async () => {
    if (!urlToCheck) return;

    setLoading(true);
    setResults(null);

    try {
      // Fetch the URL
      const response = await fetch(urlToCheck);
      const html = await response.text();

      // Create a DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract metadata
      const metadata = {
        title: doc.querySelector("title")?.textContent || "",
        metaTags: Array.from(doc.querySelectorAll("meta")).map((meta) => ({
          name:
            meta.getAttribute("name") || meta.getAttribute("property") || "",
          content: meta.getAttribute("content") || "",
        })),
        canonical:
          doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
          "",
        h1Tags: Array.from(doc.querySelectorAll("h1")).map(
          (h1) => h1.textContent,
        ),
        h2Tags: Array.from(doc.querySelectorAll("h2"))
          .map((h2) => h2.textContent)
          .slice(0, 5),
        imgAltTags: Array.from(doc.querySelectorAll("img"))
          .map((img) => ({
            src: img.getAttribute("src") || "",
            alt: img.getAttribute("alt") || "",
          }))
          .slice(0, 10),
      };

      setResults({
        url: urlToCheck,
        status: response.status,
        metadata,
      });
    } catch (error) {
      console.error("Error fetching URL:", error);
      setResults({
        url: urlToCheck,
        error: "Failed to fetch URL",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">SEO Checker Tool</h1>

      <div className="flex gap-2 mb-6">
        <Input
          type="url"
          placeholder="Enter URL to check"
          value={urlToCheck}
          onChange={(e) => setUrlToCheck(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={checkUrl} disabled={loading || !urlToCheck}>
          {loading ? "Checking..." : "Check URL"}
        </Button>
      </div>

      {results && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Results for: <span className="font-normal">{results.url}</span>
            </h2>
            {results.status && (
              <p className="text-sm">
                Status:
                <span
                  className={`ml-2 font-medium ${
                    results.status >= 200 && results.status < 300
                      ? "text-green-500"
                      : results.status >= 300 && results.status < 400
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {results.status}
                </span>
              </p>
            )}
          </div>

          {results.error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              {results.error}
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                <TabsTrigger value="headings">Headings</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="metadata">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Metadata</CardTitle>
                    <CardDescription>
                      Check if your page has proper metadata for SEO
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">Title</h3>
                        <p className="p-2 bg-muted rounded-md">
                          {results.metadata.title}
                        </p>
                        {results.metadata.title.length > 60 && (
                          <p className="text-yellow-600 text-sm mt-1">
                            Title is too long ({results.metadata.title.length}{" "}
                            chars). Keep it under 60 characters.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium mb-1">Canonical URL</h3>
                        <p className="p-2 bg-muted rounded-md break-all">
                          {results.metadata.canonical ||
                            "No canonical URL found"}
                        </p>
                        {!results.metadata.canonical && (
                          <p className="text-red-600 text-sm mt-1">
                            Missing canonical URL. Add a canonical link to
                            prevent duplicate content issues.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium mb-1">Meta Description</h3>
                        <p className="p-2 bg-muted rounded-md">
                          {results.metadata.metaTags.find(
                            (m: { name: string }) => m.name === "description",
                          )?.content || "No meta description found"}
                        </p>
                        {!results.metadata.metaTags.find(
                          (m: { name: string }) => m.name === "description",
                        )?.content && (
                          <p className="text-red-600 text-sm mt-1">
                            Missing meta description. Add a description for
                            better search results.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium mb-1">Open Graph Tags</h3>
                        <div className="space-y-2">
                          {results.metadata.metaTags.filter(
                            (m: { name: string }) => m.name.startsWith("og:"),
                          ).length > 0 ? (
                            results.metadata.metaTags
                              .filter((m: { name: string }) =>
                                m.name.startsWith("og:"),
                              )
                              .map(
                                (
                                  meta: {
                                    name:
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactElement<
                                          unknown,
                                          string | JSXElementConstructor<any>
                                        >
                                      | Iterable<ReactNode>
                                      | ReactPortal
                                      | Promise<
                                          | string
                                          | number
                                          | bigint
                                          | boolean
                                          | ReactPortal
                                          | ReactElement<
                                              unknown,
                                              | string
                                              | JSXElementConstructor<any>
                                            >
                                          | Iterable<ReactNode>
                                          | null
                                          | undefined
                                        >
                                      | null
                                      | undefined;
                                    content:
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactElement<
                                          unknown,
                                          string | JSXElementConstructor<any>
                                        >
                                      | Iterable<ReactNode>
                                      | ReactPortal
                                      | Promise<
                                          | string
                                          | number
                                          | bigint
                                          | boolean
                                          | ReactPortal
                                          | ReactElement<
                                              unknown,
                                              | string
                                              | JSXElementConstructor<any>
                                            >
                                          | Iterable<ReactNode>
                                          | null
                                          | undefined
                                        >
                                      | null
                                      | undefined;
                                  },
                                  i: Key | null | undefined,
                                ) => (
                                  <div
                                    key={i}
                                    className="p-2 bg-muted rounded-md"
                                  >
                                    <span className="font-medium">
                                      {meta.name}:
                                    </span>{" "}
                                    {meta.content}
                                  </div>
                                ),
                              )
                          ) : (
                            <p className="text-red-600">
                              No Open Graph tags found
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="headings">
                <Card>
                  <CardHeader>
                    <CardTitle>Headings Structure</CardTitle>
                    <CardDescription>
                      Check if your page has a proper heading structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">
                          H1 Tags ({results.metadata.h1Tags.length})
                        </h3>
                        {results.metadata.h1Tags.length === 0 ? (
                          <p className="text-red-600">
                            No H1 tags found. Each page should have one H1 tag.
                          </p>
                        ) : results.metadata.h1Tags.length > 1 ? (
                          <p className="text-yellow-600 mb-2">
                            Multiple H1 tags found. Consider using only one H1
                            per page.
                          </p>
                        ) : null}

                        <div className="space-y-2">
                          {results.metadata.h1Tags.map(
                            (
                              h1:
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactElement<
                                    unknown,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | ReactPortal
                                | Promise<
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | ReactPortal
                                    | ReactElement<
                                        unknown,
                                        string | JSXElementConstructor<any>
                                      >
                                    | Iterable<ReactNode>
                                    | null
                                    | undefined
                                  >
                                | null
                                | undefined,
                              i: Key | null | undefined,
                            ) => (
                              <div key={i} className="p-2 bg-muted rounded-md">
                                {h1}
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-1">
                          H2 Tags (showing first 5)
                        </h3>
                        <div className="space-y-2">
                          {results.metadata.h2Tags.length > 0 ? (
                            results.metadata.h2Tags.map(
                              (
                                h2:
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | Promise<
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactPortal
                                      | ReactElement<
                                          unknown,
                                          string | JSXElementConstructor<any>
                                        >
                                      | Iterable<ReactNode>
                                      | null
                                      | undefined
                                    >
                                  | null
                                  | undefined,
                                i: Key | null | undefined,
                              ) => (
                                <div
                                  key={i}
                                  className="p-2 bg-muted rounded-md"
                                >
                                  {h2}
                                </div>
                              ),
                            )
                          ) : (
                            <p className="text-yellow-600">
                              No H2 tags found. Consider adding H2 tags for
                              content structure.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images">
                <Card>
                  <CardHeader>
                    <CardTitle>Image Accessibility</CardTitle>
                    <CardDescription>
                      Check if your images have proper alt text
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-medium mb-1">
                        Images (showing first 10)
                      </h3>
                      <div className="space-y-2">
                        {results.metadata.imgAltTags.length > 0 ? (
                          results.metadata.imgAltTags.map(
                            (
                              img: {
                                src:
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | Promise<
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactPortal
                                      | ReactElement<
                                          unknown,
                                          string | JSXElementConstructor<any>
                                        >
                                      | Iterable<ReactNode>
                                      | null
                                      | undefined
                                    >
                                  | null
                                  | undefined;
                                alt:
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | Promise<
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactPortal
                                      | ReactElement<
                                          unknown,
                                          string | JSXElementConstructor<any>
                                        >
                                      | Iterable<ReactNode>
                                      | null
                                      | undefined
                                    >
                                  | null
                                  | undefined;
                              },
                              i: Key | null | undefined,
                            ) => (
                              <div
                                key={i}
                                className="p-2 bg-muted rounded-md flex items-start gap-2"
                              >
                                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                                  <span className="text-xs">Image</span>
                                </div>
                                <div>
                                  <p className="text-sm truncate max-w-md">
                                    {img.src}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Alt:</span>
                                    {img.alt ? (
                                      <span>{img.alt}</span>
                                    ) : (
                                      <span className="text-red-600">
                                        Missing alt text
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            ),
                          )
                        ) : (
                          <p>No images found on the page.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
}
