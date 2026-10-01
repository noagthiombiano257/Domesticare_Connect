"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import CandidateCard from "../components/CandidateCard";
import {
  createInitialDemoState,
  readDemoState,
  saveDemoState,
  type DemoMission,
  type DemoState,
} from "../demo-data";
import { clearAuthSession, readAuthSession } from "../../lib/auth";
import { notifyUser, requestNotificationPermission } from "../../lib/notifications";

export default function EmployeurPage() {
  const router = useRouter();
  const [demoState, setDemoState] = useState<DemoState>(createInitialDemoState);
  const [title, setTitle] = useState("Nounou / garde d’enfant");
  const [city, setCity] = useState("Abidjan");
  const [budget, setBudget] = useState("220 000 FCFA");
  const [schedule, setSchedule] = useState("Temps plein");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const session = readAuthSession();
    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.role !== "employeur") {
      router.replace("/travailleur");
      return;
    }

    setDemoState(readDemoState());
  }, [router]);

  function updateDemoState(nextState: DemoState) {
    setDemoState(nextState);
    saveDemoState(nextState);
  }

  function publishMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const mission: DemoMission = {
      id: `mission-${Date.now()}`,
      title,
      city,
      budget,
      schedule,
      description,
    };
    updateDemoState({ ...demoState, missions: [mission, ...demoState.missions] });
    void requestNotificationPermission();
    notifyUser("Mission publiée", "Votre mission a bien été enregistrée et publiée avec succès.");
    setNotice("Mission publiée avec succès. Elle apparaît dans l’espace travailleur.");
  }

  function requestContact(profileId: string) {
    if (demoState.contacts.includes(profileId)) return;
    updateDemoState({ ...demoState, contacts: [...demoState.contacts, profileId] });
    setNotice("Demande de contact enregistrée.");
  }

  function recruit(profileId: string) {
    if (demoState.hires.includes(profileId)) return;
    updateDemoState({ ...demoState, hires: [...demoState.hires, profileId] });
    setNotice("Recrutement enregistré.");
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
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Espace employeur</p>
            <h1 className="mt-2 text-3xl font-black">Recruter un travailleur</h1>
          </div>
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-2">
            <button type="button" onClick={handleLogout} className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">Se déconnecter</button>
          </nav>
        </header>

        {notice && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold">Détails de la mission</h2>
            <form onSubmit={publishMission} className="mt-5 space-y-4">
              <div>
                <label htmlFor="mission-title" className="mb-2 block text-sm font-medium text-slate-700">Type de besoin</label>
                <input id="mission-title" required value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" />
              </div>
              <div>
                <label htmlFor="mission-city" className="mb-2 block text-sm font-medium text-slate-700">Lieu</label>
                <input id="mission-city" required value={city} onChange={(event) => setCity(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" />
              </div>
              <div>
                <label htmlFor="mission-budget" className="mb-2 block text-sm font-medium text-slate-700">Budget mensuel</label>
                <input id="mission-budget" required value={budget} onChange={(event) => setBudget(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" />
              </div>
              <div>
                <label htmlFor="mission-schedule" className="mb-2 block text-sm font-medium text-slate-700">Horaires</label>
                <input id="mission-schedule" required value={schedule} onChange={(event) => setSchedule(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3" />
              </div>
              <div>
                <label htmlFor="mission-description" className="mb-2 block text-sm font-medium text-slate-700">Description et tâches</label>
                <textarea id="mission-description" required value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="w-full rounded-xl border border-slate-300 bg-white p-3" placeholder="Décrivez les responsabilités et vos attentes" />
              </div>
              <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">Publier la mission</button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-5">
              <h3 className="font-bold">Missions publiées ({demoState.missions.length})</h3>
              <ul className="mt-3 space-y-3">
                {demoState.missions.map((mission) => (
                  <li key={mission.id} className="rounded-xl bg-slate-50 p-3">
                    <p className="font-semibold">{mission.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{mission.city} · {mission.budget} · {mission.schedule}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-emerald-700">Étape suivante</p>
                <h2 className="mt-1 text-xl font-bold">Candidats recommandés</h2>
              </div>
              <Link href="/profils" className="text-sm font-semibold text-emerald-800 underline underline-offset-4">Voir tous les profils</Link>
            </div>
            <p className="mb-4 text-sm text-slate-600">Sélectionnez un nom pour consulter son expérience, puis contactez ou recrutez la personne.</p>
            <div className="space-y-4">
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
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
