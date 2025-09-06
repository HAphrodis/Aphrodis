"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function RobotsValidator() {
  const [robotsUrl, setRobotsUrl] = useState("");
  const [robotsContent, setRobotsContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationResults, setValidationResults] = useState<{
    issues: string[];
    warnings: string[];
    suggestions: string[];
  } | null>(null);

  const fetchRobotsTxt = async () => {
    if (!robotsUrl.trim()) return;

    setLoading(true);
    setRobotsContent("");
    setValidationResults(null);

    try {
      const formattedUrl = robotsUrl.startsWith("http")
        ? robotsUrl
        : `https://${robotsUrl}`;

      const url = formattedUrl.endsWith("/robots.txt")
        ? formattedUrl
        : `${formattedUrl}/robots.txt`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch robots.txt: ${response.status} ${response.statusText}`,
        );
      }

      const text = await response.text();
      setRobotsContent(text);

      // Validate the robots.txt content
      validateRobotsTxt(text, new URL(url).origin);
    } catch (error) {
      setValidationResults({
        issues: [
          `Failed to fetch robots.txt: ${error instanceof Error ? error.message : String(error)}`,
        ],
        warnings: [],
        suggestions: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validateRobotsTxt = (content: string, baseUrl: string) => {
    const issues: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check if robots.txt is empty
    if (!content.trim()) {
      issues.push("robots.txt is empty");
    }

    // Check for sitemap
    if (!content.toLowerCase().includes("sitemap:")) {
      warnings.push(
        "No Sitemap directive found. Consider adding a Sitemap directive to help search engines discover your sitemap.",
      );
    }

    // Check for host directive
    if (!content.toLowerCase().includes("host:")) {
      suggestions.push(
        "No Host directive found. Consider adding a Host directive to specify your preferred domain.",
      );
    }

    // Check for wildcard disallow
    if (content.toLowerCase().includes("disallow: /")) {
      const lines = content.split("\n");
      for (const line of lines) {
        if (line.trim().toLowerCase() === "disallow: /") {
          const userAgentLine = findUserAgentForDisallow(lines, line);
          if (
            userAgentLine &&
            userAgentLine.toLowerCase().includes("user-agent: *")
          ) {
            issues.push(
              "Wildcard Disallow found for all user agents. This will prevent all search engines from indexing your site.",
            );
          }
        }
      }
    }

    // Check for common issues
    if (content.includes("Disallow: /")) {
      warnings.push(
        'Case-sensitive directive found: "Disallow". While most search engines are case-insensitive, it\'s best to use lowercase "disallow" for consistency.',
      );
    }

    // Check for proper formatting
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.includes("#") && !line.includes(":")) {
        warnings.push(
          `Line ${i + 1} may be improperly formatted: "${line}". Each directive should contain a colon.`,
        );
      }
    }

    setValidationResults({ issues, warnings, suggestions });
  };

  const findUserAgentForDisallow = (
    lines: string[],
    disallowLine: string,
  ): string | null => {
    const disallowIndex = lines.findIndex(
      (line) => line.trim() === disallowLine,
    );
    if (disallowIndex === -1) return null;

    // Look backwards for the nearest User-agent directive
    for (let i = disallowIndex - 1; i >= 0; i--) {
      if (lines[i].trim().toLowerCase().startsWith("user-agent:")) {
        return lines[i].trim();
      }
    }

    return null;
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Robots.txt Validator</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Validate Robots.txt</CardTitle>
          <CardDescription>
            Enter your website URL to fetch and validate your robots.txt file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="www.hezain.org"
              value={robotsUrl}
              onChange={(e) => setRobotsUrl(e.target.value)}
            />
            <Button
              onClick={fetchRobotsTxt}
              disabled={loading || !robotsUrl.trim()}
            >
              {loading ? "Fetching..." : "Fetch & Validate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {robotsContent && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Robots.txt Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={robotsContent}
              readOnly
              className="font-mono text-sm h-64"
            />
          </CardContent>
        </Card>
      )}

      {validationResults && (
        <Card>
          <CardHeader>
            <CardTitle>Validation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {validationResults.issues.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 text-red-500 mb-2">
                    <AlertCircle size={18} />
                    Issues
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-red-500">
                    {validationResults.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResults.warnings.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 text-yellow-500 mb-2">
                    <AlertCircle size={18} />
                    Warnings
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-500">
                    {validationResults.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResults.suggestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 text-blue-500 mb-2">
                    <CheckCircle size={18} />
                    Suggestions
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-500">
                    {validationResults.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResults.issues.length === 0 &&
                validationResults.warnings.length === 0 &&
                validationResults.suggestions.length === 0 && (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle size={18} />
                    <p>No issues found. Your robots.txt looks good!</p>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
