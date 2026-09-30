export type AppRole = "employeur" | "travailleur";

export type AuthSession = {
  email: string;
  name: string;
  role: AppRole;
  loggedInAt: string;
};

export const AUTH_STORAGE_KEY = "domesticare-auth";

export function readAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<AuthSession>;
    if (
      typeof parsed?.email === "string" &&
      typeof parsed?.name === "string" &&
      (parsed?.role === "employeur" || parsed?.role === "travailleur")
    ) {
      return {
        email: parsed.email,
        name: parsed.name,
        role: parsed.role,
        loggedInAt: typeof parsed.loggedInAt === "string" ? parsed.loggedInAt : new Date().toISOString(),
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function writeAuthSession(session: AuthSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
