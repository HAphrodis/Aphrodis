/* eslint-disable @next/next/no-img-element */
"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PreviewTabProps {
  subject: string;
  previewText: string;
  content: string;
  setActiveTab: (tab: string) => void;
  setShowPreview: (show: boolean) => void;
}

export function PreviewTab({
  subject,
  previewText,
  content,
  setActiveTab,
  setShowPreview,
}: PreviewTabProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-t-4 border-t-[#11922f]">
        <CardContent className="p-6">
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <div className="font-medium">
              Subject: {subject || "Your subject will appear here"}
            </div>
            <div className="text-sm text-gray-500">
              Preview: {previewText || "Your preview text will appear here"}
            </div>
          </div>

          <div className="border rounded-md p-6 min-h-[400px] bg-white">
            {content ? (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <img
                    src="/org/logo-landscape.jpg"
                    alt="Ishimwe Jean Baptiste Logo"
                    className="h-12 mx-auto mb-4"
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                  <p>Ishimwe Jean Baptiste | Rulindo, Rwanda</p>
                  <p>
                    <a href="#" className="text-[#11922f]">
                      Unsubscribe
                    </a>{" "}
                    |
                    <a href="#" className="text-[#11922f]">
                      {" "}
                      View in browser
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-20">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Your newsletter content will be previewed here</p>
                <p className="text-sm mt-2">
                  Switch to the Compose tab to add content
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("compose")}>
          Back to Compose
        </Button>

        <Button
          onClick={() => setShowPreview(true)}
          className="bg-[#11922f] hover:bg-[#0a7a24]"
        >
          <Eye className="h-4 w-4 mr-2" />
          Full Preview
        </Button>
      </div>
    </div>
  );
}
