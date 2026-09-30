"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { createInitialDemoState, readDemoState, saveDemoState, type DemoState } from "../demo-data";

export default function ProfilsPage() {
  const [demoState, setDemoState] = useState<DemoState>(createInitialDemoState);
  const [notice, setNotice] = useState("");

  useEffect(() => setDemoState(readDemoState()), []);

  function requestContact(profileId: string) {
    if (demoState.contacts.includes(profileId)) return;
    const nextState = { ...demoState, contacts: [...demoState.contacts, profileId] };
    setDemoState(nextState);
    saveDemoState(nextState);
    setNotice("Demande de contact enregistrée dans cette démonstration.");
  }

  function recruit(profileId: string) {
    if (demoState.hires.includes(profileId)) return;
    const nextState = { ...demoState, hires: [...demoState.hires, profileId] };
    setDemoState(nextState);
    saveDemoState(nextState);
    setNotice("Recrutement enregistré dans cette démonstration.");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Annuaire des candidats</p>
            <h1 className="mt-2 text-3xl font-black">Choisir un profil</h1>
          </div>
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-2">
            <Link href="/" className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">Accueil</Link>
            <Link href="/employeur" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Publier une mission</Link>
            <Link href="/travailleur" className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">Créer un profil</Link>
          </nav>
        </header>

        <p role="status" className="mb-5 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">Sélectionnez un nom pour voir les détails. Le contact et le recrutement sont simulés pour la démonstration.</p>
        {notice && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}

        <section aria-label="Profils disponibles" className="grid gap-4 md:grid-cols-2">
          {demoState.profiles.map((profile) => (
            <CandidateCard
              key={profile.id}
              profile={profile}
              contactRequested={demoState.contacts.includes(profile.id)}
              hired={demoState.hires.includes(profile.id)}
              onContact={() => requestContact(profile.id)}
              onHire={() => recruit(profile.id)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
