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

const eventFormSchema = z.object({
  maxAttendees: z.string().regex(/^\d+$/, {
    message: "Maximum attendees must be a whole number",
  }),
  allowGuestRegistration: z.boolean(),
  defaultEventDuration: z.string().regex(/^\d+$/, {
    message: "Default event duration must be a whole number",
  }),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventSettingsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function EventSettings({ isLoading, setIsLoading }: EventSettingsProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      maxAttendees: "100",
      allowGuestRegistration: true,
      defaultEventDuration: "120",
    },
  });

  function onSubmit(data: EventFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // console.log(data);
      toast.success("Event settings updated successfully!");
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Settings</CardTitle>
        <CardDescription>
          Configure event settings for the Ishimwe Jean Baptiste.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="maxAttendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Attendees</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the default maximum number of attendees for events.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allowGuestRegistration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Allow Guest Registration
                    </FormLabel>
                    <FormDescription>
                      Enable non-members to register for events.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultEventDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Event Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the default duration for events in minutes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update event settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
