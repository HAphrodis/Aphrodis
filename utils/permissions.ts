// utils\permissions.ts
import { Roles, Role, Privilege } from "./roles";

export const hasPermission = (role: Role, privilege: Privilege): boolean => {
  const rolePermissions = Roles[role];
  if (!rolePermissions) {
    console.error(`Role "${role}" is not defined.`);
    return false;
  }
  return (rolePermissions.privileges as unknown as string[]).includes(
    privilege,
  );
};
