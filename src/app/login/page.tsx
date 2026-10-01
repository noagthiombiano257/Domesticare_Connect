"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authenticateTestAccount, readAuthSession, writeAuthSession } from "../../lib/auth";
import { notifyUser, requestNotificationPermission } from "../../lib/notifications";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = readAuthSession();
    if (!session) return;
    router.replace(session.role === "employeur" ? "/employeur" : "/travailleur");
  }, [router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const account = authenticateTestAccount(email, password);
    if (!account) {
      setError("Vérifiez votre adresse e-mail et votre mot de passe.");
      return;
    }

    const session = {
      email: account.email,
      name: account.name,
      role: account.role,
      loggedInAt: new Date().toISOString(),
    };

    writeAuthSession(session);
    void requestNotificationPermission();
    notifyUser("Connexion réussie", `Bienvenue ${account.name}, vous êtes maintenant connecté.`);
    router.replace(account.role === "employeur" ? "/employeur" : "/travailleur");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">DomestiCare Connect</p>
          <h1 className="mt-2 text-3xl font-black">Connexion</h1>
          <p className="mt-2 text-sm text-slate-600">Connectez-vous pour accéder à votre espace.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Mot de passe</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 pr-11"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-600 transition hover:text-slate-900"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                        <path d="M3 3l18 18" strokeLinecap="round" />
                        <path d="M10.58 10.58A2 2 0 0013.42 13.42" strokeLinecap="round" />
                        <path d="M9.88 5.08A10.94 10.94 0 0112 5c4.42 0 8.24 2.48 10 7-1.18 2.69-3.17 4.78-5.56 6.02M6.61 6.61A16.13 16.13 0 002 12c1.76 4.52 5.58 7 10 7a12.48 12.48 0 004.38-.78" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && <p role="alert" className="text-sm font-medium text-rose-700">{error}</p>}

              <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                Se connecter
              </button>
          </div>
        </form>
      </div>
    </main>
  );
}
