const stats = [
  { label: "Missions validées", value: "2 480", trend: "+18%" },
  { label: "Candidats vérifiés", value: "8 940", trend: "+12%" },
  { label: "Paiements sécurisés", value: "96.4%", trend: "+4.2%" },
  { label: "Score de confiance", value: "4.9/5", trend: "+0.3" },
];

const jobs = [
  { title: "Nounou à domicile", city: "Abidjan", status: "Contrat signé", date: "Aujourd’hui" },
  { title: "Femme de ménage", city: "Dakar", status: "Profil vérifié", date: "Hier" },
  { title: "Aide ménagère", city: "Lomé", status: "Paiement bloqué", date: "2 jours" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">DomestiCare Connect</p>
            <h1 className="mt-2 text-3xl font-black">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2">
            <a href="/" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Accueil
            </a>
            <a href="/employeur" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Employeur
            </a>
            <a href="/travailleur" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Travailleur
            </a>
            <a href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700">
              Se connecter
            </a>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-black">{stat.value}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Missions récentes</h2>
              <span className="text-sm text-slate-500">Vue d’ensemble</span>
            </div>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={job.title} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{job.title}</p>
                      <p className="text-sm text-slate-500">{job.city}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${index === 2 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Dernière mise à jour</span>
                    <span>{job.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Confiance</p>
            <h2 className="mt-4 text-2xl font-black">Profil IA</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                <p className="text-sm text-slate-300">Fiabilité globale</p>
                <p className="mt-2 text-3xl font-black text-emerald-300">94%</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                <p className="text-sm text-slate-300">Historique vérifié</p>
                <p className="mt-2 text-3xl font-black text-sky-300">1 280 jours</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

