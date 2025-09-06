"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronsUpDown,
  User2,
  SettingsIcon,
  LogOut,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getProfileData } from "@/app/admin/dashboard/settings/_actions/profile-settings";
import { toast } from "sonner";
import { OfflineAlert } from "@/components/ui/offline-alert";
import isOnline from "is-online";

const SidebarUser = () => {
  const { user, clearAuth, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfileData();
        updateUser(profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [updateUser]);

  useEffect(() => {
    const checkConnection = async () => {
      const online = await isOnline();
      setIsConnected(online);
      if (!online && !showOfflineAlert) {
        setShowOfflineAlert(true);
      }
    };

    checkConnection();
    const intervalId = setInterval(checkConnection, 20000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [showOfflineAlert]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        clearAuth();
        localStorage.removeItem("user");
        window.location.href = "/login";
        toast.success(
          "Logged out successfully, You will be redirected to the login page shortly",
        );
      } else {
        toast.error("Logout failed");
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleRetryConnection = async () => {
    const online = await isOnline();
    setIsConnected(online);
    if (online) {
      setShowOfflineAlert(false);
      toast.success("Connection restored!");
    } else {
      toast.error("Still offline. Please check your connection.");
    }
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <>
      {showOfflineAlert && (
        <OfflineAlert
          onDismiss={() => setShowOfflineAlert(false)}
          onRetry={handleRetryConnection}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="dark:bg-d_background-light-900 bg-slate-200"
        >
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="relative">
              <Avatar className="ml-1 h-6 w-6 rounded-full border border-slate-400">
                <AvatarImage
                  src={user.avatarUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback className="rounded-lg">{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
              </Avatar>
              <div className="dark:bg-d_background-dark-100 absolute -right-1 -bottom-1 rounded-full bg-white p-0.5">
                {isConnected ? (
                  <Wifi className="h-3 w-3 text-green-500" />
                ) : (
                  <WifiOff className="h-3 w-3 text-red-500" />
                )}
              </div>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xs font-semibold">{`${user.firstName} ${user.lastName}`}</span>
              <span className="truncate text-[0.7rem]">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="dark:bg-d_background-dark-100 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <div className="relative">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback className="rounded-lg">{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
                </Avatar>
                <div className="dark:bg-d_background-dark-100 absolute -right-1 -bottom-1 rounded-full bg-white p-0.5">
                  {isConnected ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{`${user.firstName} ${user.lastName}`}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/dashboard/settings"
                className="flex items-center"
              >
                <User2 className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/dashboard/settings"
                className="flex items-center"
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SidebarUser;
