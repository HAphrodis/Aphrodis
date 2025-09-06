"use client";

import { Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubscriberCount } from "../subscriber-count";

interface SettingsTabProps {
  selectedSegment: string;
  setSelectedSegment: (segment: string) => void;
  senderName: string;
  setSenderName: (name: string) => void;
  senderEmail: string;
  setSenderEmail: (email: string) => void;
  isLoading: boolean;
  handleSaveDraft: () => Promise<void>;
  setActiveTab: (tab: string) => void;
}

export function SettingsTab({
  selectedSegment,
  setSelectedSegment,
  senderName,
  setSenderName,
  senderEmail,
  setSenderEmail,
  isLoading,
  handleSaveDraft,
  setActiveTab,
}: SettingsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-t-4 border-t-[#11922f]">
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Recipient Settings</h3>
              <Card className="border-dashed">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="all-subscribers"
                        name="recipients"
                        value="all"
                        checked={selectedSegment === "all"}
                        onChange={() => setSelectedSegment("all")}
                        className="h-4 w-4 text-[#11922f] focus:ring-[#11922f]"
                      />
                      <label htmlFor="all-subscribers" className="font-medium">
                        All active subscribers
                      </label>
                    </div>
                    <SubscriberCount segment="all" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="segment"
                        name="recipients"
                        value="recent"
                        checked={selectedSegment === "recent"}
                        onChange={() => setSelectedSegment("recent")}
                        className="h-4 w-4 text-[#11922f] focus:ring-[#11922f]"
                      />
                      <label htmlFor="segment" className="font-medium">
                        Recent subscribers (last 30 days)
                      </label>
                    </div>
                    <SubscriberCount segment="recent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Sender Information</h3>
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sender-name" className="font-medium">
                        Sender Name
                      </Label>
                      <Input
                        id="sender-name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="mt-1.5"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        The name that will appear in recipients&apos; inboxes
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="sender-email" className="font-medium">
                        Sender Email
                      </Label>
                      <Input
                        id="sender-email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="mt-1.5"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        The email address that will be used to send the
                        newsletter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("compose")}>
          Back to Compose
        </Button>

        <Button
          onClick={handleSaveDraft}
          disabled={isLoading}
          className="bg-[#11922f] hover:bg-[#0a7a24]"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  );
}
