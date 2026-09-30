"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  createInitialDemoState,
  readDemoState,
  saveDemoState,
  type DemoState,
  type WorkerProfile,
} from "../demo-data";
import { clearAuthSession, readAuthSession } from "../../lib/auth";
import { notifyUser, requestNotificationPermission } from "../../lib/notifications";

const blankProfile: WorkerProfile = {
  id: "worker-profile",
  name: "",
  role: "",
  city: "",
  experience: "",
  rating: "Nouveau profil",
  status: "À vérifier",
  score: "—",
  bio: "",
};

export default function TravailleurPage() {
  const router = useRouter();
  const [demoState, setDemoState] = useState<DemoState>(createInitialDemoState);
  const [profile, setProfile] = useState<WorkerProfile>(blankProfile);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const session = readAuthSession();
    if (!session) {
      router.replace("/login");
      return;
    }

    const state = readDemoState();
    setDemoState(state);
    const savedProfile = state.profiles.find((item) => item.id === blankProfile.id);
    if (savedProfile) setProfile(savedProfile);
  }, [router]);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedProfile = { ...profile, status: "Profil créé" };
    const profiles = demoState.profiles.some((item) => item.id === updatedProfile.id)
      ? demoState.profiles.map((item) => item.id === updatedProfile.id ? updatedProfile : item)
      : [...demoState.profiles, updatedProfile];
    const nextState = { ...demoState, profiles };
    setProfile(updatedProfile);
    setDemoState(nextState);
    saveDemoState(nextState);
    void requestNotificationPermission();
    notifyUser("Profil enregistré", "Votre profil a bien été enregistré et est visible dans l’annuaire.");
    setNotice("Profil enregistré et visible dans l’annuaire des candidats.");
  }

  function applyToMission(missionId: string) {
    if (demoState.applications.includes(missionId)) return;
    const nextState = { ...demoState, applications: [...demoState.applications, missionId] };
    setDemoState(nextState);
    saveDemoState(nextState);
    setNotice("Candidature enregistrée avec succès.");
  }

  function handleLogout() {
    clearAuthSession();
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Espace travailleur</p>
            <h1 className="mt-2 text-3xl font-black">Créer mon profil professionnel</h1>
          </div>
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-2">
            <Link href="/" className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">Accueil</Link>
            <Link href="/employeur" className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">Espace employeur</Link>
            <Link href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Changer de rôle</Link>
            <button type="button" onClick={handleLogout} className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">Se déconnecter</button>
          </nav>
        </header>

        {notice && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">Mes informations</h2>
            <form onSubmit={saveProfile} className="mt-5 space-y-4">
              <div>
                <label htmlFor="worker-name" className="mb-2 block text-sm font-medium text-slate-700">Nom complet</label>
                <input id="worker-name" required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="w-full rounded-xl border border-slate-300 p-3" placeholder="Ex. Mariam D." />
              </div>
              <div>
                <label htmlFor="worker-role" className="mb-2 block text-sm font-medium text-slate-700">Métier recherché</label>
                <input id="worker-role" required value={profile.role} onChange={(event) => setProfile({ ...profile, role: event.target.value })} className="w-full rounded-xl border border-slate-300 p-3" placeholder="Ex. Nounou, aide à domicile" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="worker-city" className="mb-2 block text-sm font-medium text-slate-700">Ville</label>
                  <input id="worker-city" required value={profile.city} onChange={(event) => setProfile({ ...profile, city: event.target.value })} className="w-full rounded-xl border border-slate-300 p-3" placeholder="Ex. Abidjan" />
                </div>
                <div>
                  <label htmlFor="worker-experience" className="mb-2 block text-sm font-medium text-slate-700">Expérience</label>
                  <input id="worker-experience" required value={profile.experience} onChange={(event) => setProfile({ ...profile, experience: event.target.value })} className="w-full rounded-xl border border-slate-300 p-3" placeholder="Ex. 3 ans" />
                </div>
              </div>
              <div>
                <label htmlFor="worker-bio" className="mb-2 block text-sm font-medium text-slate-700">Compétences et présentation</label>
                <textarea id="worker-bio" required value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} rows={4} className="w-full rounded-xl border border-slate-300 p-3" placeholder="Présentez votre expérience et vos compétences" />
              </div>
              <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">Enregistrer mon profil</button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-emerald-700">Offres près de vous</p>
                <h2 className="mt-1 text-xl font-bold">Missions disponibles</h2>
              </div>
              <span className="text-sm text-slate-500">{demoState.missions.length} missions</span>
            </div>
            <div className="space-y-4">
              {demoState.missions.map((mission) => {
                const applied = demoState.applications.includes(mission.id);
                return (
                  <article key={mission.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{mission.title}</h3>
                        <p className="text-sm text-slate-500">{mission.city} · {mission.schedule}</p>
                      </div>
                      <span className="font-semibold text-slate-900">{mission.budget}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{mission.description}</p>
                    <button type="button" onClick={() => applyToMission(mission.id)} disabled={applied} className="mt-4 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:bg-slate-400">
                      {applied ? "Candidature envoyée" : "Postuler à cette mission"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
