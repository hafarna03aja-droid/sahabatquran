import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { listSantri, getBukuKas } from "@/lib/db";
import { createSantri, editSantri, logout, removeSantri } from "@/app/actions";
import AbsensiForm from "./_components/AbsensiForm";
import KasForm from "./_components/KasForm";
import BukuKasForm from "./_components/BukuKasForm";
import Sidebar from "./_components/Sidebar";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; ok?: string; error?: string }>;
}) {
  await requireAuth();
  const sp = await searchParams;
  const tab = sp.tab || "absensi";
  const santri = await listSantri();
  const buku = tab === "buku" ? await getBukuKas() : { saldo: 0, transaksi: [] };

  return (
    <main className="flex-1">
      <header className="bg-blue-800 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover bg-white" />
            <div>
              <h1 className="text-lg font-bold">Panel Admin - SAQ Sahabat Qur&apos;an</h1>
              <p className="text-blue-100 text-xs">Input absensi & kas santri</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-blue-100 hover:underline">
              Dasbor Publik
            </Link>
            <form action={logout}>
              <button className="rounded-lg bg-blue-900/60 px-3 py-1 hover:bg-blue-900">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <Sidebar />

        {sp.ok && (
          <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
            ✓ Data berhasil disimpan.
          </p>
        )}
        {sp.error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            ⚠ {decodeURIComponent(sp.error)}
          </p>
        )}

          <div className="mt-6">
            {tab === "absensi" && <AbsensiForm santri={santri} />}
  
            {tab === "kas" && <KasForm santri={santri} />}

            {tab === "buku" && <BukuKasForm santri={santri} saldo={buku.saldo} transaksi={buku.transaksi} />}
  
            {tab === "santri" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="mb-4 font-semibold text-slate-800">Tambah Santri Baru</h2>
                <form action={createSantri} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-600">Nama Santri *</span>
                      <input name="nama" required placeholder="Nama lengkap" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-600">Tempat Lahir</span>
                      <input name="tempat_lahir" placeholder="Kota lahir" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-600">Tanggal Lahir</span>
                      <input type="date" name="tanggal_lahir" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-600">Nama Wali</span>
                      <input name="nama_wali" placeholder="Nama orang tua/wali" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                    </label>
                    <label className="block text-sm sm:col-span-2">
                      <span className="mb-1 block font-medium text-slate-600">Alamat Wali</span>
                      <input name="alamat_wali" placeholder="Alamat lengkap" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                    </label>
                  </div>
                  <button className="rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800">
                    Simpan Santri
                  </button>
                </form>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 w-12 font-semibold">No</th>
                      <th className="px-4 py-3 font-semibold">Nama</th>
                      <th className="px-4 py-3 font-semibold">TTL</th>
                      <th className="px-4 py-3 font-semibold">Wali & Alamat</th>
                      <th className="px-4 py-3 font-semibold w-24">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {santri.map((s, i) => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-500 align-top">{i + 1}</td>
                        <td className="px-4 py-3 align-top font-medium text-slate-800">
                          <input form={`edit-${s.id}`} name="nama" defaultValue={s.nama} required className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none" />
                        </td>
                        <td className="px-4 py-3 align-top text-slate-600">
                           <input form={`edit-${s.id}`} name="tempat_lahir" defaultValue={s.tempat_lahir || ""} placeholder="Tempat" className="w-full mb-1 rounded border border-slate-200 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none" />
                           <input form={`edit-${s.id}`} type="date" name="tanggal_lahir" defaultValue={s.tanggal_lahir || ""} className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none" />
                        </td>
                        <td className="px-4 py-3 align-top text-slate-600">
                          <input form={`edit-${s.id}`} name="nama_wali" defaultValue={s.nama_wali || ""} placeholder="Nama Wali" className="w-full mb-1 rounded border border-slate-200 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none" />
                          <input form={`edit-${s.id}`} name="alamat_wali" defaultValue={s.alamat_wali || ""} placeholder="Alamat Wali" className="w-full rounded border border-slate-200 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none" />
                        </td>
                        <td className="px-4 py-3 align-top">
                          <form id={`edit-${s.id}`} action={editSantri} className="mb-2">
                            <input type="hidden" name="id" value={s.id} />
                            <button type="submit" className="text-xs text-blue-600 hover:underline font-medium">
                              Simpan
                            </button>
                          </form>
                          <form action={removeSantri}>
                            <input type="hidden" name="id" value={s.id} />
                            <button type="submit" className="text-xs text-red-600 hover:underline font-medium">
                              Hapus
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400">
                Total {santri.length} santri. Menghapus santri juga menghapus seluruh absensi & kas-nya. Edit TTL dapat dilakukan langsung di tabel.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
