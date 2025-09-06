import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageContainer from "@/components/layouts/page-container";
import { ExternalLink } from "lucide-react";

export default function DocumentationPage() {
  return (
    <PageContainer scrollable>
      <div className="container mx-auto py-10">
        <Card className="mx-auto w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Ishimwe Jean Baptiste WEBSITE DOCUMENTATION
            </CardTitle>
            <CardDescription>
              Comprehensive guide for Ishimwe Jean Baptiste&apos;s website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              This documentation provides detailed information about the HEZA
              Initiative website, including both user-accessible pages and the
              admin panel.
            </p>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">General Overview</h2>
              <p className="text-muted-foreground">
                The Ishimwe Jean Baptiste website is available at{" "}
                <Link
                  href="https://www.hezain.org"
                  className="text-primary hover:underline"
                >
                  https://www.hezain.org
                </Link>
                . It showcases the association&apos;s activities, programs, and
                resources while offering this admin panel for efficient
                management.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Full Documentation</h2>
              <p className="text-muted-foreground pb-4">
                For a comprehensive guide covering all aspects of the HEZA
                Initiative website, including detailed instructions for both
                user and admin functionalities, please refer to our full
                documentation on Notion.
              </p>
              <Button
                effect={"gooeyLeft"}
                icon={ExternalLink}
                iconPlacement="right"
                asChild
                className="mt-10"
              >
                <Link
                  href="https://hbapte.notion.site/HEZA-INITIATIVE-WEBSITE-DOCUMENTATION-1c8733abbac0803db0cbc7b4d9858feb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Documentation
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
