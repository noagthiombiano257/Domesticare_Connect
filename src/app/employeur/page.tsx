import Link from "next/link";

const candidates = [
  { name: "Mariam D.", role: "Nounou expérimentée", score: "96%", badge: "Vérifiée" },
  { name: "Aïcha K.", role: "Femme de ménage", score: "92%", badge: "Très fiable" },
  { name: "Rosine T.", role: "Aide à domicile", score: "89%", badge: "À proximité" },
];

export default function EmployeurPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Employeur</p>
            <h1 className="mt-2 text-3xl font-black">Publier une mission</h1>
          </div>

          <div className="flex items-center gap-2">
            <a href="/" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Accueil
            </a>
            <a href="/dashboard" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Dashboard
            </a>
            <a href="/travailleur" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Travailleur
            </a>
            <a href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700">
              Se connecter
            </a>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Détails de la mission</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Type de besoin</label>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3" defaultValue="Nounou / garde d’enfant" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Lieu</label>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3" defaultValue="Abidjan, Côte d’Ivoire" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Budget mensuel</label>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3" defaultValue="220 000 FCFA" />
              </div>
              <Link
                href="/profils"
                className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Trouver des profils vérifiés
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Candidats recommandés</h2>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">3 profils</span>
            </div>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div key={candidate.name} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{candidate.name}</p>
                        <p className="text-sm text-slate-500">{candidate.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                      {candidate.badge}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span>Fiabilité IA</span>
                    <span className="font-semibold text-slate-900">{candidate.score}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: candidate.score.replace("%", "") + "%" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
