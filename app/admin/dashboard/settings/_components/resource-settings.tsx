/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const resourceFormSchema = z.object({
  maxFileSize: z.string().regex(/^\d+$/, {
    message: "Maximum file size must be a whole number",
  }),
  allowedFileTypes: z.string(),
  resourceVisibility: z.enum(["public", "members", "board"]),
});

type ResourceFormValues = z.infer<typeof resourceFormSchema>;

interface ResourceSettingsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function ResourceSettings({
  isLoading,
  setIsLoading,
}: ResourceSettingsProps) {
  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      maxFileSize: "10",
      allowedFileTypes: ".pdf,.doc,.docx,.ppt,.pptx",
      resourceVisibility: "members",
    },
  });

  function onSubmit(data: ResourceFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // console.log(data);
      toast.success("Resource settings updated successfully!");
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Settings</CardTitle>
        <CardDescription>
          Configure resource settings for the Ishimwe Jean Baptiste.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="maxFileSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum File Size (MB)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the maximum file size for uploaded resources in
                    megabytes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allowedFileTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed File Types</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify allowed file extensions (e.g., .pdf,.doc,.docx).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resourceVisibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="members">Members Only</SelectItem>
                      <SelectItem value="board">Board Members Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set the default visibility for uploaded resources.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update resource settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
