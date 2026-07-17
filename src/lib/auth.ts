import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "./cookie";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "maosani123";

export function checkPassword(pw: string): boolean {
  return pw === ADMIN_PASSWORD;
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(AUTH_COOKIE)?.value === "1";
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) redirect("/login");
}
