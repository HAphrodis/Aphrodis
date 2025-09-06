// app\admin\dashboard\settings\_components\two-factor-toggle.tsx
"use client";

import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

interface TwoFactorToggleProps {
  isTwoFactorEnabled: boolean;
  onToggle: () => void;
}

export function TwoFactorToggle({
  isTwoFactorEnabled,
  onToggle,
}: TwoFactorToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500">
          {isTwoFactorEnabled
            ? "Two-factor authentication is currently enabled."
            : "Add an extra layer of security to your account. You will need to enter a code sent to your email or phone number each time you log in."}
        </p>
      </div>
      <Switch checked={isTwoFactorEnabled} onCheckedChange={onToggle} />
    </motion.div>
  );
}
