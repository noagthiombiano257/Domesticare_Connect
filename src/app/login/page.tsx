"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  authenticateTestAccount,
  readAuthSession,
  registerAccount,
  resetRegisteredAccountPassword,
  writeAuthSession,
  type AppRole,
} from "../../lib/auth";
import { notifyUser, requestNotificationPermission } from "../../lib/notifications";

type LoginMode = "login" | "register" | "forgot";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AppRole>("employeur");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const session = readAuthSession();
    if (!session) return;
    router.replace(session.role === "employeur" ? "/employeur" : "/travailleur");
  }, [router]);

  function completeLogin(account: { email: string; name: string; role: AppRole }) {
    const session = { ...account, loggedInAt: new Date().toISOString() };
    writeAuthSession(session);
    void requestNotificationPermission();
    notifyUser("Connexion réussie", `Bienvenue ${account.name}, vous êtes maintenant connecté.`);
    router.replace(account.role === "employeur" ? "/employeur" : "/travailleur");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (mode === "forgot") {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }

      const result = resetRegisteredAccountPassword(email, password);
      if (result === "updated") {
        setNotice("Mot de passe modifié sur cet appareil. Vous pouvez maintenant vous connecter.");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else if (result === "test-account") {
        setError("Le mot de passe de ce compte de test est fixe.");
      } else if (result === "not-found") {
        setError("Aucun compte inscrit avec cette adresse e-mail sur cet appareil.");
      } else {
        setError("La récupération est indisponible pour le moment.");
      }
      return;
    }

    if (mode === "register") {
      if (password.length < 8) {
        setError("Choisissez un mot de passe d’au moins 8 caractères.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }

      const result = registerAccount(name, email, password, role);
      if (result.status === "duplicate") {
        setError("Cette adresse e-mail possède déjà un compte.");
        return;
      }
      if (result.status !== "created") {
        setError("Impossible d’enregistrer le compte dans ce navigateur.");
        return;
      }

      completeLogin(result.session);
      return;
    }

    const account = authenticateTestAccount(email, password);
    if (!account) {
      setError("Vérifiez votre adresse e-mail et votre mot de passe.");
      return;
    }

    completeLogin(account);
  }

  function changeMode(nextMode: LoginMode) {
    setMode(nextMode);
    setError("");
    setNotice("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">DomestiCare Connect</p>
          <h1 className="mt-2 text-3xl font-black">
            {mode === "login" ? "Connexion" : mode === "register" ? "Créer un compte" : "Mot de passe oublié"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {mode === "login" ? "Connectez-vous pour accéder à votre espace." : mode === "register" ? "Inscrivez-vous pour rejoindre DomestiCare Connect." : "Définissez un nouveau mot de passe pour votre compte sur cet appareil."}
          </p>
        </div>

        <div className="mt-6 flex gap-2 border-b border-slate-200">
          <button type="button" onClick={() => changeMode("login")} className={`border-b-2 px-3 py-3 text-sm font-semibold ${mode === "login" ? "border-emerald-700 text-emerald-800" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            Se connecter
          </button>
          <button type="button" onClick={() => changeMode("register")} className={`border-b-2 px-3 py-3 text-sm font-semibold ${mode === "register" ? "border-emerald-700 text-emerald-800" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            S’inscrire
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-4">
              {mode === "register" && (
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Nom complet</label>
                  <input id="name" type="text" required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" autoComplete="name" />
                </div>
              )}

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
                  autoComplete="email"
                />
              </div>

              {mode === "register" && (
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-slate-700">Type de compte</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(["employeur", "travailleur"] as const).map((accountRole) => (
                      <button key={accountRole} type="button" aria-pressed={role === accountRole} onClick={() => setRole(accountRole)} className={`rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition ${role === accountRole ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                        {accountRole}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {mode !== "forgot" && (
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
                    autoComplete={mode === "register" ? "new-password" : "current-password"}
                    minLength={mode === "register" ? 8 : undefined}
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
              )}

              {mode === "forgot" && (
                <div>
                  <label htmlFor="new-password" className="mb-2 block text-sm font-medium text-slate-700">Nouveau mot de passe</label>
                  <input id="new-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" />
                </div>
              )}

              {mode !== "login" && (
                <div>
                  <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-slate-700">Confirmer le mot de passe</label>
                  <input id="confirm-password" type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" />
                </div>
              )}

              {error && <p role="alert" className="text-sm font-medium text-rose-700">{error}</p>}
              {notice && <p role="status" className="text-sm font-medium text-emerald-800">{notice}</p>}

              <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                {mode === "login" ? "Se connecter" : mode === "register" ? "Créer mon compte" : "Modifier le mot de passe"}
              </button>

              {mode === "login" && (
                <button type="button" onClick={() => changeMode("forgot")} className="w-full text-center text-sm font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-950">
                  Mot de passe oublié ?
                </button>
              )}

              {mode === "forgot" && (
                <p className="text-xs leading-5 text-slate-500">
                  Dans cette version de démonstration, le nouveau mot de passe est enregistré uniquement sur cet appareil; aucun e-mail de récupération n’est envoyé.
                </p>
              )}
          </div>
        </form>
      </div>
    </main>
  );
}
