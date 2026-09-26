"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const metrics = [
  { label: "Personnes concernées", value: "15M+", detail: "employés domestiques" },
  { label: "Secteur informel", value: "80%", detail: "sans historique vérifié" },
  { label: "Valeur du marché", value: "$22B", detail: "en Afrique de l’Ouest" },
];

const steps = [
  {
    title: "1. Publier une mission",
    description: "Un employeur décrit ses besoins, son lieu et ses critères de confiance.",
  },
  {
    title: "2. Vérifier le profil",
    description: "L’IA analyse la candidature, les références et les compétences du travailleur.",
  },
  {
    title: "3. Signer un contrat",
    description: "Un accord digital est généré automatiquement et partagé entre les deux parties.",
  },
  {
    title: "4. Payer en sécurité",
    description: "Le paiement est verrouillé et traceable sur la plateforme, avec validation finale.",
  },
];

const jobs = [
  { title: "Nounou expérimentée", city: "Abidjan", salary: "220 000 FCFA", badge: "Vérifiée" },
  { title: "Femme de ménage", city: "Dakar", salary: "180 000 FCFA", badge: "Éligible au contrat" },
  { title: "Aide à domicile", city: "Accra", salary: "260 000 FCFA", badge: "4,9/5" },
];

const personaConfig = {
  employeur: {
    label: "Pour l’employeur",
    title: "Recruter avec confiance.",
    description:
      "Recevez des candidats vérifiés, comparez leurs profils et sécurisez la mission depuis le premier contact.",
    bullets: [
      "Matching intelligent et rapide",
      "Contrat généré automatiquement",
      "Paiement protégé et traçable",
    ],
  },
  travailleur: {
    label: "Pour le travailleur",
    title: "Montrer une vraie expérience.",
    description:
      "Chaque mission est comptabilisée pour construire un historique durable, portable et vérifiable.",
    bullets: [
      "Profil vérifié par IA",
      "Historique professionnel portable",
      "Accès au crédit et à la microfinance",
    ],
  },
  finance: {
    label: "Pour les partenaires financiers",
    title: "Mieux évaluer le risque.",
    description:
      "Les données à jour permettent de mieux mesurer le revenu, l’ancienneté et la fiabilité des profils.",
    bullets: [
      "Données vérifiées et standardisées",
      "Historique crédible des missions",
      "Meilleure inclusion financière",
    ],
  },
};

const testimonials = [
  { name: "Awa Diallo", role: "Employeuse domestique", quote: "Je peux enfin prouver mes années de service et obtenir un crédit pour ouvrir mon commerce." },
  { name: "Mamadou Sarr", role: "Employeur", quote: "Je vois immédiatement la fiabilité du profil et j’ai un contrat clair pour toute la mission." },
  { name: "Finance Plus", role: "Microfinance", quote: "Nous avons désormais des données vérifiables pour mieux financer des travailleurs informels." },
];

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<keyof typeof personaConfig>("employeur");

  const activePersona = useMemo(() => personaConfig[selectedPersona], [selectedPersona]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-full border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-bold text-white">
                D
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">DomestiCare Connect</p>
                <p className="text-xs text-slate-500">Formaliser le travail domestique</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-3 text-xs text-slate-600 sm:gap-6 sm:text-sm md:flex">
              <a href="#solution" className="transition hover:text-slate-900">Solution</a>
              <a href="#fonctionnement" className="transition hover:text-slate-900">Fonctionnement</a>
              <a href="#impact" className="transition hover:text-slate-900">Impact</a>
              <a href="#contact" className="transition hover:text-slate-900">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </header>

        <section className="grid items-center gap-8 overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              AI + confiance + inclusion
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Une plateforme qui transforme le travail domestique en parcours digne, vérifiable et financable.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              DomestiCare Connect formalise le secteur informel, protège les travailleurs, sécurise les paiements et donne à chacun une preuve numérique d’expérience.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/employeur"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
              >
                Recruter un candidat
              </Link>
              <Link
                href="/travailleur"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Créer un profil
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-900">{metric.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[30px] bg-gradient-to-br from-emerald-200/60 to-sky-200/40 blur-2xl" />
            <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tableau de bord</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">Missions actives</h2>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">+18% ce mois</span>
                </div>

                <div className="space-y-3">
                  {jobs.map((job, index) => (
                    <div key={job.title} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
                            {job.title.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{job.title}</p>
                            <p className="text-xs text-slate-500">{job.city}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                          {job.badge}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>Rémunération</span>
                        <span className="font-semibold text-slate-900">{job.salary}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: `${78 + index * 7}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">La solution</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Un marché du travail domestique transparent à tous les niveaux.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl">✅</div>
              <h3 className="text-xl font-bold text-slate-900">Traçabilité</h3>
              <p className="mt-3 text-slate-600">Chaque mission est documentée, vérifiée et rattachée à un profil professionnel crédible.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-xl">🔒</div>
              <h3 className="text-xl font-bold text-slate-900">Sécurité</h3>
              <p className="mt-3 text-slate-600">Contrats, paiements et validations demeurent sécurisés, lisibles et audités. </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-xl">💳</div>
              <h3 className="text-xl font-bold text-slate-900">Accès au crédit</h3>
              <p className="mt-3 text-slate-600">Un historique portable devient une preuve de revenus et de fiabilité pour les banques et microfinances.</p>
            </div>
          </div>
        </section>

        <section id="fonctionnement" className="mt-20 rounded-[32px] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_25px_80px_rgba(15,23,42,0.2)] lg:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Comment ça marche</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Un flux de confiance, de la publication à la preuve d’expérience.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-lg font-bold text-emerald-300">
                  {step.title.split(".")[0].slice(-1)}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Parcours</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Une plateforme pensée pour chaque acteur.</h3>

              <div className="mt-6 grid gap-3">
                {(Object.keys(personaConfig) as Array<keyof typeof personaConfig>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPersona(key)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selectedPersona === key
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{personaConfig[key].label}</span>
                      <span className="text-lg">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Focus</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900">{activePersona.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{activePersona.description}</p>

              <div className="mt-6 space-y-3">
                {activePersona.bullets.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-700">✓</span>
                    <span className="font-medium text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Impact social</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Formaliser le secteur pour mieux protéger, financer et faire grandir les familles.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((quote) => (
              <div key={quote.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-white">
                    {quote.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{quote.name}</p>
                    <p className="text-sm text-slate-500">{quote.role}</p>
                  </div>
                </div>
                <p className="text-base leading-7 text-slate-600">“{quote.quote}”</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-20 rounded-[32px] border border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-[0_25px_80px_rgba(16,185,129,0.28)] lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">L’avenir du travail domestique</p>
              <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
                Une preuve de travail digne, portable et utile à chaque étape de la vie.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/employeur"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Démarrer maintenant
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
