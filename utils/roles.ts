// utils\roles.ts
export const Roles = {
  Admin: {
    privileges: [
      "read:any",
      "write:any",
      "delete:any",
      "manage:users",
    ] as const,
  },
  Manager: {
    privileges: ["read:any", "write:any", "delete:own", "manage:own"] as const,
  },
  Editor: {
    privileges: ["read:any", "write:own", "edit:own"] as const,
  },
  Guest: {
    privileges: ["read:limited"] as const,
  },
  Viewer: {
    privileges: ["read:own"] as const,
  },
} as const;

export type Role = keyof typeof Roles;
export type Privilege = (typeof Roles)[Role]["privileges"][number];
