export type Role = "recruiter" | "viewer";

export interface UserRole {
  uid: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
}

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  recruiter: [
    "jobs:create",
    "jobs:read",
    "jobs:update",
    "jobs:delete",
    "candidates:create",
    "candidates:read",
    "candidates:update",
    "candidates:delete",
    "candidates:analyze",
    "candidates:upload",
  ],
  viewer: [
    "jobs:read",
    "candidates:read",
  ],
};

export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
