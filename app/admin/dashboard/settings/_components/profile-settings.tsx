// app\admin\dashboard\settings\_components\profile-settings.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon, User, Mail, Pen, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getProfileData,
  updateProfile,
  type ProfileFormValues,
} from "../_actions/profile-settings";
import { useAuthStore } from "@/store/authStore";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatarUrl: z.string().optional(),
});

interface ProfileSettingsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function ProfileSettings({
  isLoading,
  setIsLoading,
}: ProfileSettingsProps) {
  const [userData, setUserData] = useState<any>(null);
  const { updateUser } = useAuthStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileData();
        if ("error" in data) {
          throw new Error(data.error);
        }
        setUserData(data);
        form.reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatarUrl: data.avatarUrl,
        });
        setAvatarPreview(data.avatarUrl ?? null);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to fetch user data");
      }
    };

    fetchData();
  }, [form]);

  const handleAvatarChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload the file immediately
        const formData = new FormData();
        formData.append("file", file);

        toast.promise(
          fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              form.setValue("avatarUrl", data);
              return data;
            }),
          {
            loading: "Uploading avatar...",
            success: "Avatar uploaded successfully",
            error: "Failed to upload avatar",
          },
        );
      }
    },
    [form],
  );

  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreview(null);
    form.setValue("avatarUrl", "");
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      const result = await updateProfile(data);
      if ("error" in result) {
        throw new Error(result.error);
      }
      // Update local state immediately
      setUserData((prevData: any) => ({
        ...prevData,
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: data.avatarUrl,
      }));
      updateUser(data);
      form.reset(data);
      setAvatarPreview(data.avatarUrl ?? null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 py-4 text-white">
          <div className="flex items-center space-x-4">
            <div className="group relative">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarImage
                  src={avatarPreview || userData?.avatarUrl || ""}
                  alt={`${userData?.firstName} ${userData?.lastName}` || ""}
                />
                <AvatarFallback>
                  {userData?.firstName?.[0]}
                  {userData?.lastName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 text-white"
                  onClick={() =>
                    document.getElementById("avatar-input")?.click()
                  }
                >
                  <Pen className="h-4 w-4" />
                </Button>
                {(avatarPreview || userData?.avatarUrl) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 rounded-full bg-black/50 text-white"
                    onClick={handleRemoveAvatar}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div>
              <CardTitle className="text-xl">
                {userData
                  ? `${userData.firstName} ${userData.lastName}`
                  : "Profile Settings"}
              </CardTitle>
              <CardDescription className="text-gray-100">
                Manage profile information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex w-full flex-col items-center gap-16 sm:flex-row sm:justify-between"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-full"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="John"
                              {...field}
                              className="w-full pl-10"
                            />
                            <User
                              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full"
                >
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="w-full pl-10"
                            />
                            <User
                              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            className="pl-10"
                            disabled
                          />
                          <Mail
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update profile"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
