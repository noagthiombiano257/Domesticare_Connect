const missions = [
  { title: "Garde d’enfants", place: "Abidjan", status: "Disponible", amount: "220 000 FCFA" },
  { title: "Ménage complet", place: "Dakar", status: "En cours", amount: "180 000 FCFA" },
  { title: "Aide au domicile", place: "Accra", status: "Vérifiée", amount: "260 000 FCFA" },
];

export default function TravailleurPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Travailleur</p>
            <h1 className="mt-2 text-3xl font-black">Mon profil professionnel</h1>
          </div>

          <div className="flex items-center gap-2">
            <a href="/" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Accueil
            </a>
            <a href="/dashboard" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Dashboard
            </a>
            <a href="/employeur" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Employeur
            </a>
            <a href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700">
              Se connecter
            </a>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white">
                M
              </div>
              <div>
                <h2 className="text-2xl font-black">Mariam D.</h2>
                <p className="text-slate-500">Nounou expérimentée • 5 ans</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Expérience</p>
                <p className="mt-1">5 missions validées, 1 280 jours d’activité.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Historique portable</p>
                <p className="mt-1">Données certifiées et partagées avec les partenaires financiers.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Missions disponibles</h2>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">3 offres</span>
            </div>
            <div className="space-y-4">
              {missions.map((mission) => (
                <div key={mission.title} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{mission.title}</p>
                      <p className="text-sm text-slate-500">{mission.place}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                      {mission.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span>Rémunération</span>
                    <span className="font-semibold text-slate-900">{mission.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
