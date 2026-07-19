import Link from "next/link";
import { login } from "@/app/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md"
      >
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 rounded-full object-cover bg-slate-50 border border-slate-100" />
        </div>
        <h1 className="text-lg font-bold text-slate-800 text-center">Login Admin / Ustadz</h1>
        <p className="mt-1 text-sm text-slate-500 text-center">
          Halaman input dilindungi. Masukkan kata sandi.
        </p>
        {sp.error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Kata sandi salah.
          </p>
        )}
        <input type="hidden" name="from" value={sp.from || "/admin"} />
        <label className="mt-4 block text-sm">
          <span className="mb-1 block font-medium text-slate-600">Kata Sandi</span>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </label>
        <button className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800">
          Masuk
        </button>
        <Link href="/" className="mt-3 block text-center text-xs text-slate-400 hover:underline">
          ← Kembali ke dasbor publik
        </Link>
      </form>
    </main>
  );
}
