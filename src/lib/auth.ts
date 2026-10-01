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
const ACCOUNTS_STORAGE_KEY = "domesticare-accounts";

type StoredAccount = Omit<AuthSession, "loggedInAt"> & { password: string };

function readRegisteredAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((account): account is StoredAccount =>
      typeof account?.email === "string" &&
      typeof account?.name === "string" &&
      typeof account?.password === "string" &&
      (account?.role === "employeur" || account?.role === "travailleur")
    );
  } catch {
    return [];
  }
}

export function authenticateTestAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = Object.values(TEST_ACCOUNTS).find(
    (account) => account.email === normalizedEmail && account.password === password
  ) ?? readRegisteredAccounts().find(
    (account) => account.email === normalizedEmail && account.password === password
  );

  if (!account) return null;
  return { email: account.email, name: account.name, role: account.role };
}

export function registerAccount(name: string, email: string, password: string, role: AppRole) {
  if (typeof window === "undefined") return { status: "unavailable" as const };

  const normalizedEmail = email.trim().toLowerCase();
  const emailExists = Object.values(TEST_ACCOUNTS).some((account) => account.email === normalizedEmail) ||
    readRegisteredAccounts().some((account) => account.email === normalizedEmail);
  if (emailExists) return { status: "duplicate" as const };

  const account: StoredAccount = { name: name.trim(), email: normalizedEmail, password, role };
  try {
    window.localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([...readRegisteredAccounts(), account]));
  } catch {
    return { status: "unavailable" as const };
  }

  return {
    status: "created" as const,
    session: { email: account.email, name: account.name, role: account.role, loggedInAt: new Date().toISOString() },
  };
}

export function resetRegisteredAccountPassword(email: string, password: string) {
  if (typeof window === "undefined") return "unavailable" as const;

  const normalizedEmail = email.trim().toLowerCase();
  if (Object.values(TEST_ACCOUNTS).some((account) => account.email === normalizedEmail)) {
    return "test-account" as const;
  }

  const accounts = readRegisteredAccounts();
  const accountIndex = accounts.findIndex((account) => account.email === normalizedEmail);
  if (accountIndex < 0) return "not-found" as const;

  accounts[accountIndex] = { ...accounts[accountIndex], password };
  try {
    window.localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    return "unavailable" as const;
  }

  return "updated" as const;
}

export function readAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<AuthSession>;
    const account = [...Object.values(TEST_ACCOUNTS), ...readRegisteredAccounts()].find(
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
