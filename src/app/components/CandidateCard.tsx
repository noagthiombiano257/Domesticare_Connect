"use client";

import { useState } from "react";
import type { WorkerProfile } from "../demo-data";

type CandidateCardProps = {
  profile: WorkerProfile;
  contactRequested: boolean;
  hired: boolean;
  onContact: () => void;
  onHire: () => void;
};

export default function CandidateCard({
  profile,
  contactRequested,
  hired,
  onContact,
  onHire,
}: CandidateCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-bold text-white">
            {profile.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              className="text-left font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-emerald-700"
            >
              {profile.name}
            </button>
            <p className="text-sm text-slate-500">{profile.role}</p>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-left text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 hover:text-emerald-800"
            >
              {expanded ? "Masquer le profil" : "Voir le profil"}
            </button>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-800">
          {profile.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>Correspondance</span>
        <span className="font-semibold text-slate-900">{profile.score}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-600" style={{ width: profile.score }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onContact}
          disabled={contactRequested}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-default disabled:opacity-60"
        >
          {contactRequested ? "Contact demandé" : "Contacter"}
        </button>
        <button
          type="button"
          onClick={onHire}
          disabled={hired}
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-default disabled:bg-slate-400"
        >
          {hired ? "Recruté" : "Recruter"}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm leading-6 text-slate-600">{profile.bio}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Ville</dt>
              <dd className="font-medium text-slate-900">{profile.city}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Expérience</dt>
              <dd className="font-medium text-slate-900">{profile.experience}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Évaluation</dt>
              <dd className="font-medium text-slate-900">{profile.rating}</dd>
            </div>
          </dl>
        </div>
      )}
    </article>
  );
}