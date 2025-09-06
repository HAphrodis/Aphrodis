import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  FileSearch,
  FileText,
  GitFork,
  Globe,
  LayoutDashboard,
  Search,
} from "lucide-react";

export default function SeoToolsDashboard() {
  return (
    <div className="container p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">SEO Tools Dashboard</h1>
        <Button asChild variant="outline">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Search size={16} />
            Open Search Console
            <ExternalLink size={14} />
          </a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search size={18} />
              SEO Checker
            </CardTitle>
            <CardDescription>
              Check if your pages have proper metadata, headings, and images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analyze your pages for common SEO issues like missing meta
              descriptions, improper heading structure, and missing alt text.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link
                href="/admin/tools/seo-checker"
                className="flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={18} />
              404 Checker
            </CardTitle>
            <CardDescription>
              Find and fix broken links on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check for 404 errors that could be hurting your SEO. Identify
              broken links and fix them with proper redirects.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link
                href="/admin/tools/404-checker"
                className="flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitFork size={18} />
              Redirect Checker
            </CardTitle>
            <CardDescription>
              Analyze redirect chains and fix redirect issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Identify and fix redirect chains that slow down your site and
              waste crawl budget. Ensure all redirects are properly configured.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link
                href="/admin/tools/redirect-checker"
                className="flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={18} />
              Canonical Checker
            </CardTitle>
            <CardDescription>
              Check if your pages have proper canonical URLs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ensure your pages have proper canonical URLs to prevent duplicate
              content issues and improve SEO.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link
                href="/admin/tools/canonical-checker"
                className="flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch size={18} />
              Sitemap Validator
            </CardTitle>
            <CardDescription>
              Validate your sitemap and check URL status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check if your sitemap is valid and if the URLs in it are
              accessible. Ensure your sitemap is properly configured for search
              engines.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link
                href="/admin/tools/sitemap-validator"
                className="flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={18} />
              Robots.txt Validator
            </CardTitle>
            <CardDescription>Validate your robots.txt file</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check if your robots.txt file is properly configured and follows
              best practices. Ensure search engines can properly crawl your
              site.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link
                href="/admin/tools/robots-validator"
                className="flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              Google Search Console
            </CardTitle>
            <CardDescription>
              View your site&apos;s performance in Google Search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access Google Search Console to view your site&apos;s performance,
              indexing status, and search traffic.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Open Search Console
                <ExternalLink size={14} />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
