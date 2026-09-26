import Link from "next/link";

const profiles = [
  { name: "Mariam D.", role: "Nounou expérimentée", rating: "4,9/5", city: "Abidjan", status: "Très fiable" },
  { name: "Aïcha K.", role: "Femme de ménage", rating: "4,8/5", city: "Dakar", status: "Vérifiée" },
  { name: "Rosine T.", role: "Aide à domicile", rating: "4,7/5", city: "Lomé", status: "À proximité" },
  { name: "Fatou S.", role: "Garde d’enfants", rating: "4,9/5", city: "Accra", status: "Disponibilité élevée" },
];

export default function ProfilsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Profils vérifiés</p>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">Trouver les bons profils</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Accueil
            </Link>
            <Link href="/employeur" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Employeur
            </Link>
            <Link href="/dashboard" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Dashboard
            </Link>
            <Link href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700">
              Se connecter
            </Link>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {profiles.map((profile) => (
            <div key={profile.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">{profile.name}</h2>
                  <p className="text-xs text-slate-500">{profile.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Note</span>
                  <span className="font-semibold text-slate-900">{profile.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ville</span>
                  <span className="font-semibold text-slate-900">{profile.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Statut</span>
                  <span className="font-semibold text-emerald-700">{profile.status}</span>
                </div>
              </div>

              <Link
                href="/travailleur"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Voir le profil
              </Link>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
