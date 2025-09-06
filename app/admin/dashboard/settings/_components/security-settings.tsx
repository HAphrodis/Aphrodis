"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordForm, type PasswordFormValues } from "./password-form";
import { TwoFactorToggle } from "./two-factor-toggle";
import {
  updateSecuritySettings,
  resetPassword,
} from "../_actions/security-settings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useAuthStore } from "@/store/authStore";
import { createAuditLog } from "@/utils/audit";

interface SecuritySettingsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function SecuritySettings({
  isLoading,
  setIsLoading,
}: SecuritySettingsProps) {
  const { clearAuth } = useAuthStore();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactorConfirm, setShowTwoFactorConfirm] = useState(false);
  const [showPasswordChangeConfirm, setShowPasswordChangeConfirm] =
    useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordFormValues | null>(
    null,
  );
  const [logoutReason, setLogoutReason] = useState<string>("");
  const [pendingAction, setPendingAction] = useState<() => Promise<void>>(
    () => async () => {},
  );

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        clearAuth();
        localStorage.removeItem("user");

        // Show success message before redirecting
        toast.success("Logged out successfully. Redirecting to login page...");

        // Short delay to allow toast to be seen
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error("Logout failed");
        console.error("Logout failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout. Please try again.");
      setIsLoading(false);
    }
  };

  // Function to prompt for logout with a specific reason
  const promptForLogout = (reason: string, action: () => Promise<void>) => {
    setLogoutReason(reason);
    setPendingAction(() => action);
    setShowLogoutConfirm(true);
  };

  // Function to execute the pending action and then logout
  const executeActionAndLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      await pendingAction();
      // The action has been performed, now logout
      await handleLogout();
    } catch (error) {
      console.error("Error executing action:", error);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const fetchAndUpdateUserData = async () => {
    try {
      const result = await updateSecuritySettings({});
      if ("error" in result) {
        throw new Error(result.error);
      }
      setIsTwoFactorEnabled(result.isTwoFactorEnabled);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchAndUpdateUserData();
  }, []);

  const handleTwoFactorToggle = () => {
    setShowTwoFactorConfirm(true);
  };

  const confirmTwoFactorToggle = async () => {
    setShowTwoFactorConfirm(false);

    const newTwoFactorState = !isTwoFactorEnabled;

    // If enabling 2FA, prompt for logout
    if (newTwoFactorState) {
      promptForLogout(
        "Enabling two-factor authentication requires you to log out and log back in for security reasons.",
        async () => {
          setIsLoading(true);
          try {
            const result = await updateSecuritySettings({
              isTwoFactorEnabled: true,
            });

            if ("error" in result) {
              setError(result.error);
              toast.error(result.error);
              setIsLoading(false);
            } else if ("success" in result) {
              setSuccess(result.success);
              toast.success(result.success);
              setIsTwoFactorEnabled(true);

              // Create audit log
              await createAuditLog(
                "Two-Factor Authentication Enabled",
                "User enabled two-factor authentication",
              );
            }
          } catch (error) {
            console.error("Error updating two-factor settings:", error);
            toast.error("Failed to update two-factor settings");
            setIsLoading(false);
          }
        },
      );
    } else {
      // If disabling 2FA, just update without logout
      setIsLoading(true);
      try {
        const result = await updateSecuritySettings({
          isTwoFactorEnabled: false,
        });

        if ("error" in result) {
          setError(result.error);
          toast.error(result.error);
        } else if ("success" in result) {
          setSuccess(result.success);
          toast.success(result.success);
          setIsTwoFactorEnabled(false);

          // Create audit log
          await createAuditLog(
            "Two-Factor Authentication Disabled",
            "User disabled two-factor authentication",
          );
        }
      } catch (error) {
        console.error("Error updating two-factor settings:", error);
        toast.error("Failed to update two-factor settings");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // First, validate the current password without changing it
      const validationResult = await updateSecuritySettings({
        currentPassword: data.currentPassword,
        newPassword: "TemporaryPassword123!@#", // This won't be used if validation fails
      });

      if ("error" in validationResult) {
        // If there's an error and no logout required, just show the error
        if (!validationResult.requireLogout) {
          setError(validationResult.error);
          toast.error(validationResult.error);
          setIsLoading(false);
          return;
        }
      }

      // If we get here, the current password is valid
      // Now show confirmation dialog
      setPasswordData(data);
      setIsLoading(false);
      setShowPasswordChangeConfirm(true);
    } catch (error) {
      console.error("Error validating password:", error);
      toast.error("Failed to validate current password");
      setIsLoading(false);
    }
  };

  const confirmPasswordChange = async () => {
    setShowPasswordChangeConfirm(false);

    if (!passwordData) return;

    promptForLogout(
      "Changing your password requires you to log out and log back in with your new password for security reasons.",
      async () => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
          const result = await resetPassword({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          });

          if ("error" in result) {
            setError(result.error);
            toast.error(result.error);
            setIsLoading(false);
          } else if ("success" in result) {
            setSuccess(result.success);
            toast.success(result.success);

            // Create audit log
            await createAuditLog(
              "Password Changed",
              "User changed their password",
            );
          }
        } catch (error) {
          console.error("Error updating password:", error);
          toast.error("Failed to update password");
          setIsLoading(false);
        } finally {
          setPasswordData(null);
        }
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 py-4 text-white">
          <CardTitle className="text-xl">Security Settings</CardTitle>
          <CardDescription className="text-gray-100">
            Manage your account security and authentication methods.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <PasswordForm
            onSubmit={onPasswordSubmit}
            isLoading={isLoading}
            error={error}
            success={success}
          />
          <TwoFactorToggle
            isTwoFactorEnabled={isTwoFactorEnabled}
            onToggle={handleTwoFactorToggle}
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={showTwoFactorConfirm}
        onOpenChange={setShowTwoFactorConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isTwoFactorEnabled ? "Disable" : "Enable"} Two-Factor
              Authentication?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isTwoFactorEnabled
                ? "This will remove the extra layer of security from your account."
                : "This will add an extra layer of security to your account. You will need to log out and log back in after enabling."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmTwoFactorToggle}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showPasswordChangeConfirm}
        onOpenChange={setShowPasswordChangeConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Password Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change your password? You will need to
              log out and log back in with your new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={confirmPasswordChange}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New logout confirmation dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Security Change Requires Logout</AlertDialogTitle>
            <AlertDialogDescription>{logoutReason}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={executeActionAndLogout}
            >
              Continue and Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
