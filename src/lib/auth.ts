export type AppRole = "employeur" | "travailleur";

export type AuthSession = {
  email: string;
  name: string;
  role: AppRole;
  loggedInAt: string;
};

export const TEST_ACCOUNTS: Record<AppRole, Omit<AuthSession, "loggedInAt"> & { password: string }> = {
  employeur: {
    email: "employeur@test.com",
    name: "Employeur Démo",
    role: "employeur",
    password: "Employeur2026!",
  },
  travailleur: {
    email: "travailleur@test.com",
    name: "Travailleur Démo",
    role: "travailleur",
    password: "Travailleur2026!",
  },
};

export const AUTH_STORAGE_KEY = "domesticare-auth";

export function authenticateTestAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return Object.values(TEST_ACCOUNTS).find(
    (account) => account.email === normalizedEmail && account.password === password
  ) ?? null;
}

export function readAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<AuthSession>;
    const account = Object.values(TEST_ACCOUNTS).find(
      (candidate) => candidate.email === parsed?.email && candidate.role === parsed?.role
    );
    if (
      account &&
      parsed?.name === account.name
    ) {
      return {
        email: account.email,
        name: account.name,
        role: account.role,
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
