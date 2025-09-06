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

const membershipFormSchema = z.object({
  membershipFee: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message:
      "Membership fee must be a valid number with up to 2 decimal places",
  }),
  allowAutoRenewal: z.boolean(),
  gracePeriod: z.string().regex(/^\d+$/, {
    message: "Grace period must be a whole number",
  }),
});

type MembershipFormValues = z.infer<typeof membershipFormSchema>;

interface MembershipSettingsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function MembershipSettings({
  isLoading,
  setIsLoading,
}: MembershipSettingsProps) {
  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      membershipFee: "50.00",
      allowAutoRenewal: true,
      gracePeriod: "30",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(data: MembershipFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // console.log(data);
      toast.success("Membership settings updated successfully!");
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Settings</CardTitle>
        <CardDescription>
          Configure membership settings for the Public Health Student
          Association.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="membershipFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Fee (RWF)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the annual membership fee for the association.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allowAutoRenewal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Allow Automatic Renewal
                    </FormLabel>
                    <FormDescription>
                      Enable members to automatically renew their membership.
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
              name="gracePeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grace Period (days)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the grace period for membership renewal after
                    expiration.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update membership settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
