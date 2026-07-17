"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  addSantri,
  deleteSantri,
  upsertKas,
  upsertKehadiran,
  type KategoriKas,
  type StatusKehadiran,
  type TipeKelas,
} from "@/lib/db";
import { checkPassword } from "@/lib/auth";
import { AUTH_COOKIE } from "@/lib/cookie";
import { validateHari } from "@/lib/constants";

export async function login(formData: FormData) {
  const pw = String(formData.get("password") || "");
  if (!checkPassword(pw)) {
    redirect("/login?error=1");
  }
  const store = await cookies();
  store.set(AUTH_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  const from = String(formData.get("from") || "/admin");
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
  redirect("/login");
}

export async function createSantri(formData: FormData) {
  const nama = String(formData.get("nama") || "").trim();
  if (nama) await addSantri(nama);
  redirect("/admin?tab=santri");
}

export async function removeSantri(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) await deleteSantri(id);
  redirect("/admin?tab=santri");
}

export async function submitKehadiran(formData: FormData) {
  const tanggal = String(formData.get("tanggal") || "");
  const tipeKelas = String(formData.get("tipeKelas") || "") as TipeKelas;
  const inputBy = String(formData.get("inputBy") || "admin");
  const err = validateHari(tipeKelas, tanggal);
  if (err) redirect(`/admin?tab=absensi&error=${encodeURIComponent(err)}`);
  const rows: { santriId: string; status: StatusKehadiran }[] = [];
  for (const [key, val] of formData.entries()) {
    if (key.startsWith("status_")) {
      rows.push({ santriId: key.slice(7), status: val as StatusKehadiran });
    }
  }
  await upsertKehadiran(rows, tanggal, tipeKelas, inputBy);
  redirect("/admin?tab=absensi&ok=1");
}

export async function submitKas(formData: FormData) {
  const tanggal = String(formData.get("tanggal") || "");
  const kategori = String(formData.get("kategori") || "") as KategoriKas;
  const inputBy = String(formData.get("inputBy") || "admin");
  const rows: { santriId: string; lunas: boolean; nominal: number | null }[] = [];
  for (const [key, val] of formData.entries()) {
    if (key.startsWith("lunas_")) {
      const id = key.slice(6);
      const nominalRaw = formData.get(`nominal_${id}`);
      const nominal = nominalRaw ? Number(nominalRaw) || null : null;
      rows.push({ santriId: id, lunas: val === "on", nominal });
    }
  }
  await upsertKas(rows, tanggal, kategori, inputBy);
  redirect("/admin?tab=kas&ok=1");
}
