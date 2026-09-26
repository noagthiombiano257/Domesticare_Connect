import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
      <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Connexion</p>
            <h1 className="mt-2 text-3xl font-black">Bienvenue</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
            Accueil
          </Link>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              defaultValue="mariam@domesticare.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-0 transition focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Mot de passe</label>
            <input
              type="password"
              defaultValue="password123"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-0 transition focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="h-4 w-4 accent-emerald-600" />
              Se souvenir de moi
            </label>
            <a href="/" className="font-medium text-emerald-700 hover:text-emerald-800">
              Retour accueil
            </a>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Retour
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 rounded-full bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Connexion
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
