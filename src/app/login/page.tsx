"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readAuthSession, writeAuthSession, type AppRole } from "../../lib/auth";
import { notifyUser, requestNotificationPermission } from "../../lib/notifications";

const roles = [
  {
    title: "Je suis employeur",
    description: "Publier une mission, consulter les candidats et recruter.",
    value: "employeur" as const,
  },
  {
    title: "Je suis travailleur",
    description: "Créer un profil professionnel et répondre aux missions.",
    value: "travailleur" as const,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<AppRole>("employeur");

  useEffect(() => {
    const session = readAuthSession();
    if (!session) return;
    router.replace(session.role === "employeur" ? "/employeur" : "/travailleur");
  }, [router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedName = name.trim() || trimmedEmail.split("@")[0] || "Utilisateur";

    if (!trimmedEmail || !password.trim()) return;

    const session = {
      email: trimmedEmail,
      name: trimmedName,
      role,
      loggedInAt: new Date().toISOString(),
    };

    writeAuthSession(session);
    void requestNotificationPermission();
    notifyUser(
      mode === "register" ? "Inscription réussie" : "Connexion réussie",
      mode === "register"
        ? `Bienvenue ${trimmedName}, votre compte a bien été créé.`
        : `Bienvenue ${trimmedName}, vous êtes maintenant connecté.`
    );
    router.replace(role === "employeur" ? "/employeur" : "/travailleur");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Accès à la plateforme</p>
            <h1 className="mt-2 text-3xl font-black">Connexion et inscription</h1>
          </div>
          <Link href="/" className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">Accueil</Link>
        </div>

        <div className="mt-6 flex gap-3 rounded-full bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            S’inscrire
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {roles.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                className={`rounded-2xl border p-4 text-left transition ${
                  role === option.value
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <p className="text-lg font-bold">{option.title}</p>
                <p className="mt-2 text-sm leading-6">{option.description}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold">{mode === "login" ? "Accéder à mon compte" : "Créer un compte"}</h2>
            <div className="mt-4 space-y-4">
              {mode === "register" && (
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Nom complet</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3"
                    placeholder="Ex. Awa Diallo"
                  />
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

              <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                {mode === "login" ? "Se connecter" : "Créer mon compte"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
